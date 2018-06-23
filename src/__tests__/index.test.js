import Client, {methods} from '../'

beforeEach(() => {
  fetch.resetMocks()
})

test('should be defined', () => {
  expect(Client).toBeDefined()
})

test('should make requests', async () => {
  const client = new Client('fake/url')
  fetch.mockResponse(JSON.stringify({ password: '123456' }))

  Object.keys(methods).forEach(async (method) => {
    const result = await client[method]()
    expect(result).toBeDefined()
    expect(result.data.password).toBe('123456')
  })
})

test('should apply middleware', async () => {
  const fn = jest.fn()

  const client = new Client('fake/url')
  fetch.mockResponse(JSON.stringify({ password: '123456' }))

  client.useMiddleware(fn)
  client.useMiddleware(fn)
  client.useMiddleware(fn)

  await client.get()

  expect(fn).toHaveBeenCalledTimes(3)
})

test('should throw if no base URL provided', () => {
  expect(() => new Client()).toThrow()
})

test('should add query string with params', async () => {
  const client = new Client('fake/url')
  fetch.mockResponse(JSON.stringify({ password: '123456' }))

  const result = await client.get('/best', {params: {name: 'person'}})

  expect(result.url).toMatch(/.*name=person$/)
})

test('should allow delay to be set', async () => {
  const client = new Client('fake/url', {delay: 1000})

  const fn = jest.fn(client.delay)
  client.delay = fn

  fetch.mockResponse(JSON.stringify({ password: '123456' }))

  await client.get()

  expect(fn).toBeCalled()
})

test('should stringify object for post', async () => {
  const client = new Client('fake/url', {delay: 1000})

  fetch.mockResponse(JSON.stringify({success: true}))

  const res = await client.post('', {body: {hello: true}})

  expect(res.data.success).toBeTruthy()
})
