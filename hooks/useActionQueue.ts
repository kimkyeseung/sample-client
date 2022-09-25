import { useState, useCallback, useEffect, useReducer } from 'react'
import { Action } from 'interfaces'

type Reducer<S, A> = (prevState: S, action: A) => S;

const useActionQueue = (reducer, initialState) => {
  const [queue, setQueue]: [Action[], any] = useState([])
  const [pending, setPending] = useState(false)
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    const action: Action = queue[0]
    if (action && pending === false) {
      setPending(true)
      dispatch(action)
      setTimeout(() => {
        setQueue((queue) => queue.slice(1))
        setPending(false)
      }, action.delay || 0)
    }
  }, [queue, pending])

  const dispatchQueue = useCallback((action) => {
    setQueue((queue) => [...queue, action])
  }, [])

  return [state, dispatchQueue]
}

export default useActionQueue
