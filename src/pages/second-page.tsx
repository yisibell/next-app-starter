import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps, NextPage } from 'next'

const SecondPage: NextPage = () => {
  const { t } = useTranslation('second-page')

  return (
    <>
      <main>
        <h1>{t('h1')}</h1>

        <Link href="/">
          <button type="button">{t('back-to-home')}</button>
        </Link>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['second-page', 'footer'])),
  },
})

export default SecondPage
