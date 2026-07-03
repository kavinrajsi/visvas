'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useState, useRef, useEffect } from 'react'
import styles from './ProjectFilters.module.scss'
import { PROJECT_TYPE_LABELS, STATUS_LABELS } from './helpers'

const DropdownIcon = ({ className }) => (
  <span className={className}>
    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_351_2225)">
        <path d="M6.00002 11C5.86053 11 5.72089 10.943 5.61439 10.8291L0.159852 4.99578C-0.053284 4.76784 -0.053284 4.39874 0.159852 4.17095C0.372988 3.94316 0.718124 3.94302 0.931123 4.17095L6.00002 9.59184L11.0689 4.17095C11.2821 3.94302 11.6272 3.94302 11.8402 4.17095C12.0532 4.39889 12.0533 4.76799 11.8402 4.99578L6.38566 10.8291C6.27916 10.943 6.13952 11 6.00002 11Z" fill="#303030"/>
      </g>
      <defs>
        <clipPath id="clip0_351_2225">
          <rect width="12" height="11" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </span>
)

export default function ProjectFilters({
  category = 'ongoing',
  availableLocations = [],
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [minBudget, setMinBudget] = useState(searchParams.get('minBudget') || '')
  const [maxBudget, setMaxBudget] = useState(searchParams.get('maxBudget') || '')

  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRefs = useRef({})

  const updateParams = useCallback((updates) => {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })

    newParams.set('page', '1')
    router.replace(`?${newParams.toString()}`)
  }, [searchParams, router])

  const handleStatusChange = (value) => {
    setStatus(value)
    updateParams({ status: value })
    setOpenDropdown(null)
  }

  const handleTypeChange = (value) => {
    setType(value)
    updateParams({ type: value })
    setOpenDropdown(null)
  }

  const handleLocationChange = (value) => {
    setLocation(value)
    updateParams({ location: value })
    setOpenDropdown(null)
  }

  const handleBudgetApply = () => {
    updateParams({ minBudget, maxBudget })
    setOpenDropdown(null)
  }


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!Object.values(dropdownRefs.current).some(ref => ref?.contains(e.target))) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className={styles['project-filters']}>
      <div className={styles['project-filters__row']}>
        {/* Project Status Dropdown */}
        <div
          className={styles['project-filters__dropdown']}
          ref={(el) => (dropdownRefs.current['status'] = el)}
        >
          <button
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
            className={styles['project-filters__dropdown-btn']}
          >
            {status ? STATUS_LABELS[status] : 'Project Status'}
            <DropdownIcon className={styles['project-filters__dropdown-icon']} />
          </button>
          {openDropdown === 'status' && (
            <div className={styles['project-filters__dropdown-menu']}>
              <button
                className={styles['project-filters__dropdown-item']}
                onClick={() => handleStatusChange('')}
              >
                All Status
              </button>
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  className={`${styles['project-filters__dropdown-item']} ${status === key ? styles['project-filters__dropdown-item--active'] : ''}`}
                  onClick={() => handleStatusChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Type Dropdown */}
        <div
          className={styles['project-filters__dropdown']}
          ref={(el) => (dropdownRefs.current['type'] = el)}
        >
          <button
            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
            className={styles['project-filters__dropdown-btn']}
          >
            {type ? PROJECT_TYPE_LABELS[type] : 'Project Type'}
            <DropdownIcon className={styles['project-filters__dropdown-icon']} />
          </button>
          {openDropdown === 'type' && (
            <div className={styles['project-filters__dropdown-menu']}>
              <button
                className={styles['project-filters__dropdown-item']}
                onClick={() => handleTypeChange('')}
              >
                All Types
              </button>
              {Object.entries(PROJECT_TYPE_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  className={`${styles['project-filters__dropdown-item']} ${type === key ? styles['project-filters__dropdown-item--active'] : ''}`}
                  onClick={() => handleTypeChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Dropdown */}
        {availableLocations.length > 0 && (
          <div
            className={styles['project-filters__dropdown']}
            ref={(el) => (dropdownRefs.current['location'] = el)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
              className={styles['project-filters__dropdown-btn']}
            >
              {location || 'Project Location'}
              <DropdownIcon className={styles['project-filters__dropdown-icon']} />
            </button>
            {openDropdown === 'location' && (
              <div className={styles['project-filters__dropdown-menu']}>
                <button
                  className={styles['project-filters__dropdown-item']}
                  onClick={() => handleLocationChange('')}
                >
                  All Locations
                </button>
                {availableLocations.map((loc) => (
                  <button
                    key={loc}
                    className={`${styles['project-filters__dropdown-item']} ${location === loc ? styles['project-filters__dropdown-item--active'] : ''}`}
                    onClick={() => handleLocationChange(loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Budget Dropdown */}
        <div
          className={styles['project-filters__dropdown']}
          ref={(el) => (dropdownRefs.current['budget'] = el)}
        >
          <button
            onClick={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
            className={styles['project-filters__dropdown-btn']}
          >
            Project Budget
            <DropdownIcon className={styles['project-filters__dropdown-icon']} />
          </button>
          {openDropdown === 'budget' && (
            <div className={styles['project-filters__dropdown-menu']}>
              <div className={styles['project-filters__budget-form']}>
                <input
                  type="number"
                  placeholder="Min (₹)"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  className={styles['project-filters__budget-input']}
                />
                <input
                  type="number"
                  placeholder="Max (₹)"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className={styles['project-filters__budget-input']}
                />
                <button
                  onClick={handleBudgetApply}
                  className={styles['project-filters__budget-apply']}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={() => updateParams({ status, type, location, minBudget, maxBudget })}
          className={styles['project-filters__search-btn']}
        >
          Search
        </button>
      </div>
    </div>
  )
}
