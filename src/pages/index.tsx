import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { useEffect } from 'react'
import { $api } from '~/api'

const { publicRuntimeConfig } = getConfig()

type Posts = {
  author: string
  content: string
}

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const testLoginApi = async () => {
    const res = await $api.user.login({
      username: 'ANLF',
      password: '123456',
    })

    console.log('test login api', res)
  }

  useEffect(() => {
    console.log('runtime config:', publicRuntimeConfig)
    console.log('get static props', posts)

    testLoginApi()
  })

  return (
    <>
      <div>ya hoo! this is home page!!!</div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx)

  const posts: Posts[] = []

  return {
    props: {
      posts,
    },
  }
}

export default Home
