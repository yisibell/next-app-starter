import qs from 'qs'
import axios from 'axios'
import type { ICreateRequestApi } from '~/types/apiRepository'
import getConfig from 'next/config'
import $layer from '~/plugins/layer'
import isClient from '~/utils/isClient'
import store from '~/store'

const { publicRuntimeConfig } = getConfig()

const assign = (obj: {}, def: {}) => {
  return Object.assign({}, obj, def)
}

const redirect = (path: string) => {
  if (isClient()) {
    window.location.href = path
  }
}

const createAxiosInstance = () => {
  const { NEXT_APP_BASE_API } = publicRuntimeConfig

  const axiosInstance = axios.create({
    baseURL: NEXT_APP_BASE_API,
    timeout: 50000,
  })

  // 请求拦截
  axiosInstance.interceptors.request.use(
    (config) => {
      // set JWT token
      const state = store.getState()

      axiosInstance.defaults.headers.common.Authorization =
        state.site.accessToken || ''

      return config
    },
    (err) => {
      console.error('[Request Error]：', err)

      return Promise.reject(err)
    }
  )

  // 响应拦截
  axiosInstance.interceptors.response.use(
    (resp) => {
      const { code, data } = resp.data

      if (![200, 201, 0].includes(code)) {
        // 重定向处理
        if ([301, 302].includes(code)) {
          const { location } = data

          redirect(location)
        } else {
          console.error('[Response Error Data]:', resp)
        }
      }

      return resp.data
    },
    (err) => {
      const code = err.response?.status

      console.error('[HTTP Response Error Code]:', code)
      console.error('[HTTP Response Error Info]:', err)

      if (code === 401) {
        // token 失效
        redirect('/login')
      }

      if (err.isAxiosError) {
        console.error('[Axios Response Error Info]:', err)
      }

      return Promise.reject(err)
    }
  )

  return axiosInstance
}

// 创建请求api
const createRequestApi: ICreateRequestApi =
  (axiosInstance) =>
  (option, extraOption = {}) => {
    const { dataType = 'json', mock = false, loading = false } = extraOption
    const { NEXT_APP_MOCK_API } = publicRuntimeConfig

    // 是否 mock 数据模式
    if (mock && NEXT_APP_MOCK_API) {
      option.url = `${NEXT_APP_MOCK_API}${option.url}`
    }

    if (dataType === 'formData') {
      // 发送 formData 数据格式
      option.headers = assign(
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        option.headers || {}
      )
      option.data = qs.stringify(option.data)
    } else if (dataType === 'formData2') {
      // 含文件
      option.headers = assign(
        {
          'Content-Type': 'multipart/form-data',
        },
        option.headers || {}
      )
    }

    return new Promise((resolve, reject) => {
      if (isClient() && loading) {
        $layer.showLoading()
      }

      axiosInstance(option)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          if (isClient() && loading) $layer.closeLoading()
        })
    })
  }

// axios instance
const axiosInstance = createAxiosInstance()

// 二次包装请求方法
const request = createRequestApi(axiosInstance)

export default request
