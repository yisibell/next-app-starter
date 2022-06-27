import React from 'react'
import {
  decrement,
  increment,
  resetCountAsync,
} from '~/store/features/counter/reducer'
import { useAppDispatch, useAppSelector } from '~/store'
import type { NextPage } from 'next'

const Counter: NextPage = () => {
  const count = useAppSelector((state) => state.counter.value)
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

export default Counter
