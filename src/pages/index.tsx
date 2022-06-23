import type { NextPage } from 'next'
import getConfig from 'next/config'
import { useEffect } from 'react'
import styles from '~/styles/Home.module.scss'

const { publicRuntimeConfig } = getConfig()

const Home: NextPage = () => {
  useEffect(() => {
    console.log('runtime config:', publicRuntimeConfig)
  }, [])

  return <div className={styles.container}>ya hoo! this is home page!!!</div>
}

export default Home
