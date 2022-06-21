import type { NextPage } from 'next'

import getConfig from 'next/config'
import { useEffect } from 'react'

const { publicRuntimeConfig } = getConfig()

const Home: NextPage = () => {
  useEffect(() => {
    console.log('runtime config:', publicRuntimeConfig)
  }, [])

  return <div>ya hoo!</div>
}

export default Home
