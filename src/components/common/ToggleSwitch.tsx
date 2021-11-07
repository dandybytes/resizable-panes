import React, {FC} from 'react'

import './ToggleSwitch.css'

type TSProps = {
  enabled: boolean
  classes?: string
  onToggle: () => void
  label?: string
  value?: number | string
}

const ToggleSwitch: FC<TSProps> = ({enabled, classes, onToggle, label, value}) => {
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

// ToggleSwitch.propTypes = {
//   enabled: PropTypes.bool,
//   classes: PropTypes.string,
//   value: PropTypes.bool.isRequired,
//   onToggle: PropTypes.func.isRequired
// }

export default ToggleSwitch
