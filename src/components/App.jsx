import React, {useState} from 'react'

import './App.css'

import ToggleSwitch from './common/ToggleSwitch'
import ResizablePanes from './ResizablePanes'

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

      <ResizablePanes orientation={isRow ? 'row' : 'column'}>
        <div className='sample-content'>first pane</div>
        <div className='sample-content'>second pane</div>
        <div className='sample-content'>third pane</div>
      </ResizablePanes>
    </>
  )
}

export default Application
