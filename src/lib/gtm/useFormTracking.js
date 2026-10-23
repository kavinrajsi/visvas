'use client'

import { useCallback, useEffect, useRef } from 'react'
import { pushDataLayer, sanitiseFormPayload } from './events'

// Form lifecycle tracking for Google Tag Manager.
//
// Every form on the site calls this hook and reports each user action through
// the returned callbacks. Each callback pushes one event to the dataLayer, with
// a consistent `form_type` / `form_name` / `form_location` so a single GTM
// trigger per event can forward it to GA4.
//
// Events pushed (in lifecycle order):
//   form_view              form rendered / modal opened
//   form_start             first field interaction (once per attempt)
//   form_validation_error  client-side validation blocked the submit
//   form_submit            request sent to /api/forms/submit
//   form_submission        outcome; form_status = success | error
//   form_abandon           form closed/unmounted after starting, without success
//
// Raw field values are never pushed. See sanitiseFormPayload in ./events.js.

function currentPath() {
  return typeof window !== 'undefined' ? window.location.pathname : ''
}

export function useFormTracking(formType, { formName, projectName = null, active = true } = {}) {
  const started = useRef(false)
  const startedAt = useRef(null)
  const succeeded = useRef(false)
  const attempts = useRef(0)

  const base = useCallback(
    () => ({
      form_type: formType,
      form_name: formName || formType,
      form_location: currentPath(),
      ...(projectName ? { project_name: projectName } : {}),
    }),
    [formType, formName, projectName],
  )

  const timeSinceStart = () =>
    startedAt.current ? Math.round(performance.now() - startedAt.current) : null

  const reset = useCallback(() => {
    started.current = false
    startedAt.current = null
    succeeded.current = false
    attempts.current = 0
  }, [])

  const trackView = useCallback(() => {
    pushDataLayer({ event: 'form_view', ...base() })
  }, [base])

  const trackStart = useCallback(
    (fieldName) => {
      if (started.current) return
      started.current = true
      startedAt.current = performance.now()
      pushDataLayer({ event: 'form_start', ...base(), first_field: fieldName || null })
    },
    [base],
  )

  const trackValidationError = useCallback(
    (errors = {}) => {
      const fields = Object.keys(errors).filter((key) => errors[key])
      pushDataLayer({
        event: 'form_validation_error',
        ...base(),
        error_type: 'validation',
        error_fields: fields.join(','),
        error_count: fields.length,
      })
    },
    [base],
  )

  const trackSubmit = useCallback(
    (formData = {}) => {
      attempts.current += 1
      pushDataLayer({
        event: 'form_submit',
        ...base(),
        attempt: attempts.current,
        time_to_submit_ms: timeSinceStart(),
        ...sanitiseFormPayload(formData),
      })
    },
    [base],
  )

  const trackSuccess = useCallback(
    (formData = {}) => {
      succeeded.current = true
      pushDataLayer({
        event: 'form_submission',
        ...base(),
        form_status: 'success',
        attempt: attempts.current,
        time_to_submit_ms: timeSinceStart(),
        submission_time: new Date().toISOString(),
        ...sanitiseFormPayload(formData),
      })
      // A successful submit clears the form; the next fill is a new attempt.
      reset()
    },
    [base, reset],
  )

  const trackError = useCallback(
    (errorType, errorMessage, formData = {}, serverErrors = []) => {
      pushDataLayer({
        event: 'form_submission',
        ...base(),
        form_status: 'error',
        error_type: errorType, // server | network
        error_message: errorMessage || 'Unknown error',
        error_fields: Array.isArray(serverErrors) ? serverErrors.join(' | ') : '',
        attempt: attempts.current,
        submission_time: new Date().toISOString(),
        ...sanitiseFormPayload(formData),
      })
    },
    [base],
  )

  const trackAbandon = useCallback(() => {
    if (!started.current || succeeded.current) return
    pushDataLayer({
      event: 'form_abandon',
      ...base(),
      attempts: attempts.current,
      time_on_form_ms: timeSinceStart(),
    })
    reset()
  }, [base, reset])

  // form_view when the form becomes visible; form_abandon when it goes away
  // after the user had started filling it in.
  useEffect(() => {
    if (!active) return undefined
    trackView()
    return () => {
      trackAbandon()
    }
  }, [active, trackView, trackAbandon])

  return {
    trackView,
    trackStart,
    trackValidationError,
    trackSubmit,
    trackSuccess,
    trackError,
    trackAbandon,
  }
}
