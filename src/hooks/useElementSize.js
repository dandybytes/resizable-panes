import {useEffect, useState, useRef} from 'react'

export const useElementSize = (elementRef, debounceDuration = 100) => {
  const isFirstTimeRef = useRef(true)
  const timeoutRef = useRef(null)

  const [elementSize, setElementSize] = useState(null)

  const observerRef = useRef(
    new ResizeObserver(entries => {
      // watch only the first element (entries[0]), as only one will be provided
      if (!debounceDuration) return setElementSize(entries[0].contentRect)

      // use a ref to keep track if getting values for first time, and, if so, avoid debounce
      if (isFirstTimeRef.current) {
        setElementSize(entries[0].contentRect)
        isFirstTimeRef.current = false
        return
      }

      if (debounceDuration) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setElementSize(entries[0]?.contentRect)
        }, debounceDuration)
      }
    })
  )

  useEffect(() => {
    const element = elementRef.current
    const observer = observerRef.current
    if (element && observer) observer.observe(element)

    return () => {
      if (element && observer) observer.unobserve(element)
    }
  }, [elementRef, observerRef])

  return elementSize
}
