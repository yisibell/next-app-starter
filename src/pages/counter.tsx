import React from 'react'
import { useSelector } from 'react-redux'
import {
  decrement,
  increment,
  resetCountAsync,
} from '~/store/features/counter/reducer'
import { AppState, useAppDispatch } from '~/store'

export default function Counter() {
  const count = useSelector<AppState, number>((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const handleReset = async () => {
    const res = await dispatch(resetCountAsync(1000)).unwrap()

    console.log(res)
  }

  return (
    <div>
      <h3> Counter </h3>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <button aria-label="Decrement value" onClick={handleReset}>
          Reset Async
        </button>
      </div>
    </div>
  )
}
