import React, {useState} from 'react'

import './App.css'

import MultiPaneContainer from './MultiPaneContainer'
import ToggleSwitch from './common/ToggleSwitch'

const Application = () => {
  const [isRow, setIsRow] = useState(true)

  return (
    <>
      <h1 className='title'>ReactJS Resizable Panes</h1>

      <ToggleSwitch
        value={isRow}
        label='is row'
        onToggle={() => setIsRow(prevValue => !prevValue)}
      />

      <MultiPaneContainer orientation={isRow ? 'row' : 'column'}>
        <div className='sample-content'>first pane</div>
        <div className='sample-content'>second pane</div>
        <div className='sample-content'>third pane</div>
      </MultiPaneContainer>
    </>
  )
}

export default Application
