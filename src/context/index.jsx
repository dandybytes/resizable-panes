import React, {createContext, useCallback, useMemo, useReducer} from 'react'
import paneReducer, {initialState} from '../reducers/paneReducer'

export const DividerContext = createContext()
export const PaneContext = createContext()

export const MainProvider = ({orientation, minPaneSize, children}) => {
  const [state, dispatch] = useReducer(paneReducer, initialState)
  const {indexSelectedPane, initialDividerPosition, currentDividerPosition, paneSizes} = state

  // console.log('root provider update')

  const handleDragStart = useCallback(
    ({
      indexSelectedPane,
      initialDividerPosition,
      currentDividerPosition,
      maxSpaceBefore,
      maxSpaceAfter
    }) => {
      dispatch({
        type: 'startDrag',
        payload: {
          indexSelectedPane,
          initialDividerPosition,
          currentDividerPosition,
          maxSpaceBefore,
          maxSpaceAfter
        }
      })
    },
    [dispatch]
  )

  const handleDragEnd = useCallback(() => {
    if (indexSelectedPane == null) return
    dispatch({type: 'endDrag'})
  }, [dispatch, indexSelectedPane])

  const updateDividerPosition = useCallback(
    event => {
      if (indexSelectedPane == null) return
      dispatch({
        type: 'updateDividerPosition',
        payload: {currentDividerPosition: event.clientX}
      })
    },
    [dispatch, indexSelectedPane]
  )

  const updateSizes = useCallback(
    newPaneSizes => {
      dispatch({
        type: 'updatePaneSizes',
        payload: {paneSizes: newPaneSizes}
      })
    },
    [dispatch]
  )

  const paneContext = useMemo(
    () => ({
      orientation,
      minPaneSize,
      paneSizes,
      updateSizes,
      handleDragEnd,
      updateDividerPosition
    }),
    [orientation, minPaneSize, paneSizes, updateSizes, handleDragEnd, updateDividerPosition]
  )

  const dividerContext = useMemo(
    () => ({
      indexSelectedPane,
      initialDividerPosition,
      currentDividerPosition,
      handleDragStart
    }),
    [indexSelectedPane, initialDividerPosition, currentDividerPosition, handleDragStart]
  )

  return (
    <PaneContext.Provider value={paneContext}>
      <DividerContext.Provider value={dividerContext}>{children}</DividerContext.Provider>
    </PaneContext.Provider>
  )
}
