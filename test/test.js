const Promise = require('../dist/index.js').default

describe('Promise', function() {
  describe('#then(resolve)', function() {
    it('async', function(done) {
      const promise = new Promise(function(resolve) {
        setTimeout(function() {
          resolve('hello')
        }, 20)
      })

      promise.then(function(result) {
        if (result === 'hello') {
          done()
        } else {
          done('result is wrong')
        }
      })
    })

    it('sync', function(done) {
      const promise = new Promise(function(resolve) {
        resolve('hello')
      })
      promise.then(function(result) {
        if (result === 'hello') {
          done()
        } else {
          done('result is wrong')
        }
      })
    })
  })

  describe('#then(resolve, reject)', function() {
    it('async', function(done) {
      const promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject('hello')
        }, 20)
      })

      const onRejected = function(reason) {
        if (reason === 'hello') {
          done()
        } else {
          done('reason is wrong')
        }
      }

      promise.then(function(result) {
        done('should be reject')
      }, onRejected)
    })

    it('sync', function(done) {
      const promise = new Promise(function(resolve, reject) {
        throw new Error('hello')
      })

      const onRejected = function(reason) {
        if (reason instanceof Error && reason.message === 'hello') {
          done()
        } else {
          done('reason is wrong')
        }
      }

      promise.then(function(result) {
        done('should be reject')
      }, onRejected)
    })
  })

  describe('#catch', function() {
    it('async', function(done) {
      const promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject('hello')
        }, 20)
      })

      promise.catch(function(reason) {
        if (reason === 'hello') {
          done()
        } else {
          done('reason is wrong')
        }
      })
    })

    it('sync', function(done) {
      const promise = new Promise(function(resolve, reject) {
        throw new Error('hello')
      })

      promise.catch(function(reason) {
        if (reason instanceof Error && reason.message === 'hello') {
          done()
        } else {
          done('reason is wrong')
        }
      })
    })
  })
})
