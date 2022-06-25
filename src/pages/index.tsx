import type { NextPage } from 'next'
import getConfig from 'next/config'
import { useEffect } from 'react'
import { $api } from '~/api'

const { publicRuntimeConfig } = getConfig()

const Home: NextPage = () => {
  const handleLogin = async () => {
    const res = await $api.user.login({
      username: 'ANLF',
      password: '123456',
    })

    console.log('test login api', res)
  }

  useEffect(() => {
    console.log('runtime config:', publicRuntimeConfig)

    handleLogin()
  })

  return (
    <>
      <div>ya hoo! this is home page!!!</div>
    </>
  )
}

export default Home
