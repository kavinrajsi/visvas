'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import styles from './ProjectFilters.module.css'
import { PROJECT_TYPE_LABELS } from './helpers'

export default function ProjectFilters({
  category = 'ongoing',
  availableLocations = [],
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [minBudget, setMinBudget] = useState(searchParams.get('minBudget') || '')
  const [maxBudget, setMaxBudget] = useState(searchParams.get('maxBudget') || '')

  // Debounced search handler
  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ search })
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const updateParams = useCallback((updates) => {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })

    newParams.set('page', '1') // Reset to page 1 on filter change
    router.push(`?${newParams.toString()}`)
  }, [searchParams, router])

  const handleTypeChange = (e) => {
    const newType = e.target.value
    setType(newType)
    updateParams({ type: newType })
  }

  const handleLocationChange = (e) => {
    const newLocation = e.target.value
    setLocation(newLocation)
    updateParams({ location: newLocation })
  }

  const handleMinBudgetChange = (e) => {
    const val = e.target.value
    setMinBudget(val)
    updateParams({ minBudget: val })
  }

  const handleMaxBudgetChange = (e) => {
    const val = e.target.value
    setMaxBudget(val)
    updateParams({ maxBudget: val })
  }

  const handleClear = () => {
    setSearch('')
    setType('')
    setLocation('')
    setMinBudget('')
    setMaxBudget('')
    router.push(`?page=1`)
  }

  return (
    <div className={styles['project-filters']}>
      <div className={styles['project-filters__row']}>
        {/* Search */}
        <div className={styles['project-filters__group']}>
          <label htmlFor="search" className={styles['project-filters__label']}>
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Project name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles['project-filters__input']}
          />
        </div>

        {/* Project Type */}
        <div className={styles['project-filters__group']}>
          <label htmlFor="type" className={styles['project-filters__label']}>
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className={styles['project-filters__select']}
          >
            <option value="">All Types</option>
            {Object.entries(PROJECT_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        {availableLocations.length > 0 && (
          <div className={styles['project-filters__group']}>
            <label htmlFor="location" className={styles['project-filters__label']}>
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={handleLocationChange}
              className={styles['project-filters__select']}
            >
              <option value="">All Locations</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Budget Range */}
        <div className={styles['project-filters__group']}>
          <label className={styles['project-filters__label']}>
            Budget Range (₹)
          </label>
          <div className={styles['project-filters__budget-inputs']}>
            <input
              type="number"
              placeholder="Min"
              value={minBudget}
              onChange={handleMinBudgetChange}
              className={styles['project-filters__input-small']}
            />
            <span className={styles['project-filters__dash']}>−</span>
            <input
              type="number"
              placeholder="Max"
              value={maxBudget}
              onChange={handleMaxBudgetChange}
              className={styles['project-filters__input-small']}
            />
          </div>
        </div>

        {/* Clear button */}
        <button
          onClick={handleClear}
          className={styles['project-filters__clear']}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
