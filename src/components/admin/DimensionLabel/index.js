'use client'

import React from 'react'
import { FieldLabel } from '@payloadcms/ui'

import './index.scss'

/**
 * Field label that appends a recommended image size next to the field title.
 *
 * Usage in a field config:
 *   admin: {
 *     components: {
 *       Label: {
 *         path: '@/components/admin/DimensionLabel',
 *         clientProps: { dimensions: '320×414' },
 *       },
 *     },
 *   }
 */
export const DimensionLabel = ({ dimensions, field, label, path, required }) => (
  <div className="dimension-label">
    <FieldLabel label={label ?? field?.label} path={path} required={required} />
    {dimensions ? <small className="dimension-label__size">{dimensions}</small> : null}
  </div>
)

export default DimensionLabel
