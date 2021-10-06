import React from 'react'
import PropTypes from 'prop-types'

import './ToggleSwitch.css'

const ToggleSwitch = ({enabled, classes, onToggle, label, value}) => {
  return (
    <label className={`switch-label ${classes}`}>
      <div className={`switch-container`}>
        <input
          type='checkbox'
          className='switch-checkbox'
          checked={enabled}
          value={value}
          onChange={onToggle}
        />
        <span className='switch-slider'></span>
      </div>
      <span className='switch-label'>{label}</span>
    </label>
  )
}

ToggleSwitch.propTypes = {
  enabled: PropTypes.bool,
  classes: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
}

ToggleSwitch.defaultProps = {}

export default ToggleSwitch
