import React, {useState} from 'react'

import './App.css'

import ToggleSwitch from './common/ToggleSwitch'
import {ResizablePanes} from './common/resizable-panes'

function App() {
  const [isRow, setIsRow] = useState(false)

  return (
    <>
      <h1 className='title'>ReactJS Resizable Panes</h1>

      <ToggleSwitch
        enabled={isRow}
        label='is row'
        onToggle={() => setIsRow(prevValue => !prevValue)}
      />

      <div style={{height: '75vh', width: '100vw', display: 'flex'}}>
        <ResizablePanes
          orientation={isRow ? 'row' : 'column'}
          minPaneSize={100}
          dividerPalette={{
            idle: 'lightgray',
            hovered: 'gray',
            valid: 'green',
            invalid: 'tomato'
          }}
        >
          {Array.from({length: 3}, (v, i) => i + 1).map(x => (
            <div className='sample-content' key={`sample-content-${x}`}>
              pane {x}
            </div>
          ))}
        </ResizablePanes>
        {/*
      <ResizablePanes
        orientation={splitDirection}
        style={{height: '100vh'}}
        minPaneSize={theme.spacing(40)}
        dividerPalette={{
          idle: theme.palette.grey[100],
          hovered: theme.palette.grey[200],
          valid: theme.palette.primary.light,
          invalid: theme.palette.error.light
        }}
      >
        <WorkflowStep pageDetails={currentPageDetails} workflowLabel={workflowMeta.label} />

        {isAdditionalPaneVisible && <FeatureTabs />}
      </ResizablePanes> */}
      </div>
    </>
  )
}

export default App
