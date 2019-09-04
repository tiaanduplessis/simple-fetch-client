import tenFetch from 'tenacious-fetch'
import safeStringify from 'fast-safe-stringify'
import fetchResponseEnhancer from 'fetch-response-enhancer'
import Middleware from 'nanomiddleware'
import deepAssign from 'deep-assign'

import { toQueryString } from './utils'

export const methods = {
  get: 'GET',
  delete: 'DELETE',
  head: 'HEAD',
  options: 'OPTIONS',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
}

export default class Client {
  constructor (baseURL, config = {}) {
    if (!baseURL || typeof baseURL !== 'string') {
      throw new Error('No base URL provided')
    }

    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, baseURL.length - 1) : baseURL
    this.fetch = config.fetch || tenFetch
    this.middlware = new Middleware()
    this.delayTime = config.delay || false

    delete config.fetch

    this.config = config
  }

  delay (time = 1000) {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }

  useMiddleware (fn, config = {}) {
    this.middlware.use(fn, config)
  }

  async request (path = '', config) {
    const url = `${this.baseURL}${path}${config.params ? toQueryString(config.params) : ''}`

    const opts = deepAssign({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, this.config, config)

    if (
      typeof opts.body === 'object' && opts.headers['Content-Type'] === 'application/json'
    ) {
      opts.body = safeStringify(opts.body || {})
    }

    if (this.delayTime) {
      await this.delay(this.delayTime)
    }

    const res = await this.fetch(url, opts)
    const enhancedRes = await fetchResponseEnhancer(res, opts)
    enhancedRes.url = url


    return this.middlware.run(enhancedRes)
  }

  get (path, config = {}) {
    return this.request(path, deepAssign(config, { method: methods.get }))
  }

  delete (path, config = {}) {
    return this.request(
      path,
      deepAssign(config, { method: methods.delete })
    )
  }

  head (path, config = {}) {
    return this.request(
      path,
      deepAssign(config, { method: methods.delete })
    )
  }

  options (path, config = {}) {
    return this.request(
      path,
      deepAssign(config, { method: methods.options })
    )
  }

  post (path, config = {}) {
    return this.request(path, deepAssign(config, { method: methods.post }))
  }

  put (path, config = {}) {
    return this.request(path, deepAssign(config, { method: methods.put }))
  }

  patch (path, config = {}) {
    return this.request(path, deepAssign(config, { method: methods.patch }))
  }
}
