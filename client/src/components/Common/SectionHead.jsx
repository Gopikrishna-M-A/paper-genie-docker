import React from 'react'

export default function SectionHead({ title, icon }) {
  return (
    <div className="section-head">
        <div className="section-title">{title}</div>
        { icon && React.cloneElement(icon, { className: 'section-icon' }) }
    </div>  
  )
}
