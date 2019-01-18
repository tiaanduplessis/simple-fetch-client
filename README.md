
# 🌐 simple-fetch-client
[![package version](https://img.shields.io/npm/v/simple-fetch-client.svg?style=flat-square)](https://npmjs.org/package/simple-fetch-client)
[![package downloads](https://img.shields.io/npm/dm/simple-fetch-client.svg?style=flat-square)](https://npmjs.org/package/simple-fetch-client)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/simple-fetch-client.svg?style=flat-square)](https://npmjs.org/package/simple-fetch-client)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> A friendly fetch client

## Table of Contents

- [🌐 simple-fetch-client](#simple-fetch-client)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
  - [Contribute](#contribute)
  - [License](#license)

## Features

- Retries and timeouts on requests via [tenacious-fetch](https://github.com/tiaanduplessis/tenacious-fetch)
- Using middleware via [nanomiddleware](https://github.com/tiaanduplessis/nanomiddleware)
- Caching of requests via [lscache](https://github.com/pamelafox/lscache)
- Parsing of responses via [fetch-response-enhancer](https://github.com/tiaanduplessis/fetch-response-enhancer)


## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install simple-fetch-client
$ # OR
$ yarn add simple-fetch-client
```

## Usage

```js
import 'babel-polyfill'
import Client from 'simple-fetch-client'

const api = new Client('https://jsonplaceholder.typicode.com')

api.useMiddleware((res) => {
  console.log(res.url, res.status)
  return res
})

api.get('/posts/1').then(res => console.log(res.data.userId)) // 1
api.post('/posts', {hello: true}).then(res => console.log(res.data)) // Object {id: 101}
api.get('/posts', {params: {q: true}})

class MyAPI extends Client {
  constructor (config = {}) {
    super('https://jsonplaceholder.typicode.com', {
      delay: 2000 // delay requests with 2 seconds
    })

    this.useMiddleware(res => {
      if (config.log) {
        console.log('MyAPI', res.url, res.data)
      }

      return res
    })
  }

  async getPosts () {
    const res = this.get('/posts').then(res => res.d)
    return res.body
  }
}

const myAPI = new MyAPI({log: true})

myAPI.getPosts().then(console.log)

```

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    