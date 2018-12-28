/* eslint global-require: 0 */

describe('moduleName: index', () => {
  const mocks = {
    files: {
      initiate: jest.fn()
    }
  }

  beforeAll(() => { 
  })

  test('引入 something', () => {
    require('../index')

    expect(mocks.files.initiate).toHaveBeenNthCalledWith(1, 'something') 
  })
})
