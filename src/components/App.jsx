import React, {useState} from 'react'

import './App.css'

import MultiPaneContainer from './MultiPaneContainer'
import ToggleSwitch from './common/ToggleSwitch'
import {MainProvider} from '../context'

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

      <MainProvider>
        <MultiPaneContainer orientation={isRow ? 'row' : 'column'}>
          <div className='sample-content'>first pane</div>
          <div className='sample-content'>second pane</div>
          <div className='sample-content'>third pane</div>
        </MultiPaneContainer>
      </MainProvider>
    </>
  )
}

export default Application
