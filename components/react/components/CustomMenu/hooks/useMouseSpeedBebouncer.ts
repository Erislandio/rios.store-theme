import { useEffect, useRef } from 'react'

interface MousePosition {
  x: number | null
  y: number | null
}

const lastPosition: MousePosition = { x: null, y: null }
const currentPosition: MousePosition = { x: null, y: null }

let listenerCount = 0
let lastTimestamp = 0
let mouseSpeed = 0

const handleMouseMove = (e: MouseEvent) => {
  currentPosition.x = e.pageX
  currentPosition.y = e.pageY

  if (lastPosition.x != null && lastPosition.y != null) {
    const now = e.timeStamp
    const distance = Math.sqrt(
      (currentPosition.x - lastPosition.x) ** 2 +
        (currentPosition.y - lastPosition.y) ** 2
    )

    // gives us speed in pixels/second
    const interval = now - lastTimestamp

    mouseSpeed = Math.round((distance / interval) * 1000)
    lastTimestamp = now
  }

  lastPosition.x = currentPosition.x
  lastPosition.y = currentPosition.y
}

export const useMouseSpeed = () => {
  useEffect(() => {
    if (listenerCount === 0) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    listenerCount += 1

    return () => {
      listenerCount -= 1

      if (listenerCount > 0) {
        return
      }

      lastPosition.x = null
      lastPosition.y = null
      currentPosition.x = null
      currentPosition.y = null
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return {
    // Can return NaN for tiny variations
    getMouseSpeed: () => mouseSpeed || 0,
  }
}

// Max mouse speed in pixels/second to allow the debounced method to be called
const MAX_MOUSE_SPEED = 450
const DEBOUNCE_INTERVAL = 200

export const useMouseSpeedDebouncer = (
  fn: any,
  {
    delay = DEBOUNCE_INTERVAL,
    maxSpeed = MAX_MOUSE_SPEED,
  }: { delay: number; maxSpeed: number }
) => {
  const timeout = useRef<number | null>(null)
  const { getMouseSpeed } = useMouseSpeed()

  return (...args: any[]) => {
    let lastSpeed: number | null = null

    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }

    timeout.current = window.setTimeout(function check() {
      const speed = getMouseSpeed()

      if (speed <= maxSpeed) {
        fn(...args)
      } else if (lastSpeed !== null && lastSpeed > maxSpeed) {
        fn(...args)
      } else if (lastSpeed == null || lastSpeed !== speed) {
        timeout.current = window.setTimeout(check, delay)
      }

      lastSpeed = speed
    }, delay)
  }
}
