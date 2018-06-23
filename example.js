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
