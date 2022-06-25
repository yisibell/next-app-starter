import user, { IUserApiModuleInstance } from './modules/user'
import { IRequestInstance } from '~/types/apiRepository'
import request from '~/plugins/fetch'

/**
 * api 仓库
 */
export interface IApiRepository {
  user: IUserApiModuleInstance
}

export interface IApiRepositoryFactory {
  (fn: IRequestInstance): IApiRepository
}

export let $api: IApiRepository

export const apiRepo: IApiRepositoryFactory = (request) => {
  $api = {
    user: user(request),
  }

  return $api
}

apiRepo(request)
