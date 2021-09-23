import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import { ElMessage } from 'element-plus'
import errorHandle from './errorHandle'
import router from '@/router/index'
import store from '@/store'
// 定义请求头不需要添加token的路径
import publicConfig from '@/config'
// 自定义 promise interface
import { HttpResponse } from '@/interface/interface'
import { clearLocalStorage } from '@/utils/localStorage'
import { filterObjEmptyField } from '@/utils/utils'
// 取消请求函数
const CancelToken = axios.CancelToken

class HttpRequest {
  private baseUrl: string;
  private pending: Record<string, Canceler>
  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
    // 全局的变量，用于取消请求
    this.pending = {}
  }

  // 获取axios实例的配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 1000 * 10
    }
    return config
  }

  // 取消请求函数
  removePending (key: string, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key] // 防止内存泄漏,还有删除对象上没有的属性不会报错
  }

  // 设定拦截器
  interceptors (instance: AxiosInstance) {
    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
      // 判断是否是公共路径，是的话，就不要添加token
      let isPublic = false
      publicConfig.publicPath.map(path => {
        isPublic = isPublic || path.test(config.url || '')
      })
      // 添加token
      const token = (store.state as any).user.loginuserInfo.token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      // console.log('config:' + JSON.stringify(config))
      // 取消请求的配置
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c: any) => {
        this.pending[key] = c
      })
      // 在发送请求之前做些什么
      return config
    }, (error: Error) => {
      // 对请求错误做些什么
      errorHandle(error)
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((response) => {
      // console.log('response:' + JSON.stringify(response))
      // 对响应数据做点什么

      // 正常的请求，关于取消请求的（数据回来了，不需要取消请求了，但是要删除请求对应的key）
      const key = response.config.url + '&' + response.config.method
      this.removePending(key)
      const { code, msg } = response.data
      if (response.status === 200) {
        // 错误信息提示
        if (code !== 0) {
          if (code !== 1007 && code) {
            ElMessage({
              type: 'error',
              message: msg
            })
          }
          // token签名失效
          if (code == 1006 || code == 1011) {
            // 退出清除信息
            clearLocalStorage()
            router.push('/login')
          }
          // if (code == 1012) {
          //   ElMessage({
          //     type: 'error',
          //     message: msg
          //   })
          // }
          console.log('请求出差错-', response)
          // return Promise.reject(new Error(msg || 'Error'))
        } else {
          // return response.data
          // return Promise.resolve(response.data)
        }
        // 暂时先这样兼容处理都返回 不然文件下载用不了
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response)
      }
    }, (error: Error) => {
      // 对响应错误做点什么

      errorHandle(error)
      // debugger
      return Promise.reject(error)
    })
  }

  // 创建实例
  request (options: AxiosRequestConfig) {
    const instance = axios.create()
    // 整合配置
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)

    // return instance.request(newOptions)
    return instance(newOptions)
  }

  get (url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> | Promise<HttpResponse> {
    const options = Object.assign({
      method: 'get',
      url: url,
      params: filterObjEmptyField(params)
    }, config)
    return this.request(options)
  }

  post (url: string, data?: any, config?: any): Promise<AxiosResponse>| Promise<HttpResponse> {
    const options = Object.assign({
      method: 'post',
      url: url,
      data: filterObjEmptyField(data)
    }, config)
    return this.request(options)
  }
}

export default HttpRequest
