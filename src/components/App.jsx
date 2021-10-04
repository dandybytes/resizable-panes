import React from 'react'

import './App.css'

import MultiPaneContainer from './MultiPaneContainer'

const Application = () => {
  return (
    <>
      <h1 className='title'>ReactJS Resizable Panes</h1>

      <MultiPaneContainer>
        <div className='sample-content'>first pane</div>
        <div className='sample-content'>second pane</div>
        <div className='sample-content'>third pane</div>
      </MultiPaneContainer>
    </>
  )
}

export default Application
