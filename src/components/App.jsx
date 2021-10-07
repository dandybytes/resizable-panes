import React, {useState} from 'react'

import './App.css'

import ToggleSwitch from './common/ToggleSwitch'
import ResizablePanes from './ResizablePanes'

const Application = () => {
  const [isRow, setIsRow] = useState(false)

  return (
    <>
      <h1 className='title'>ReactJS Resizable Panes</h1>

      <ToggleSwitch
        value={isRow}
        label='is row'
        onToggle={() => setIsRow(prevValue => !prevValue)}
      />

      <div style={{height: '75vh', width: '100vw', display: 'flex'}}>
        <ResizablePanes orientation={isRow ? 'row' : 'column'} minPaneSize={100}>
          {Array.from({length: 3}, (v, i) => i + 1).map(x => (
            <div className='sample-content' key={`sample-content-${x}`}>
              pane {x}
            </div>
          ))}
        </ResizablePanes>
      </div>
    </>
  )
}

export default Application
