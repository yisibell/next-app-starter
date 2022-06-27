import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { useEffect } from 'react'
import { $api } from '~/api'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const { publicRuntimeConfig } = getConfig()

type Posts = {
  author: string
  content: string
}

const Home: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { posts } = props

  const { t } = useTranslation('common')

  const testLoginApi = async () => {
    const res = await $api.user.login({
      username: 'ANLF',
      password: '123456',
    })

    console.log('test login api', res)
  }

  useEffect(() => {
    console.log('props', props)
    console.log('runtime config:', publicRuntimeConfig)
    console.log('get static props', posts)

    testLoginApi()
  })

  return (
    <>
      <h1>{t('h1')}</h1>

      <Link href="/second-page">
        <button type="button">{t('to-second-page')}</button>
      </Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx

  const posts: Posts[] = []

  const translations = await serverSideTranslations(locale || '', ['common'])

  return {
    props: {
      posts,
      ...translations,
    },
  }
}

export default Home
