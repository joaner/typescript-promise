/**
 * Promise class
 * @class
 */
export default class Promise {
  /**
   * promise process status
   */
  public status: String = 'pending'

  /**
   * promise process result
   */
  protected result: any

  /**
   * promise executed callback
   */
  protected resolves: Array<Function> = []
  protected rejects: Array<Function> = []

  /**
   * create a Promise execute
   */
  constructor(execute: Function) {
    const onFulfilled = this.fulfilled.bind(this)
    const onRejected = this.rejected.bind(this)

    try {
      execute(onFulfilled, onRejected)
    } catch (e) {
      onRejected(e)
    }
  }

  /**
   * add callback
   * @param {Function} resolve - on resolved callback
   * @param {Function} reject - on rejected callback
   */
  then(resolve: Function, reject?: Function) {
    this.resolves.push(resolve)
    if (reject) {
      this.rejects.push(reject)
    }

    // if already done, execute left callbacks
    if (this.status === 'rejected') {
      this.callback(this.rejects)
    } else if (this.status === 'fulfilled') {
      this.callback(this.resolves)
    }
  }

  /**
   * add rejected callback
   * @param {Function} reject - on rejected callback
   */
  catch(reject: Function) {
    this.rejects.push(reject)

    if (this.status === 'rejected') {
      this.callback(this.rejects)
    }
  }

  /**
   * on promise resolved callback
   * @param {any} result - promise result
   */
  fulfilled(result: any) {
    this.status = 'fulfilled'
    this.result = result

    this.callback(this.resolves)
  }

  /**
   * on promise rejected callback
   * @param {any} reason - promise rejected reason or Error
   */
  rejected(reason) {
    this.status = 'rejected'
    this.result = reason

    this.callback(this.rejects)
  }

  /**
   * execute callbacks
   * @param {Array<Function>} callbacks
   */
  callback(callbacks: Array<Function>) {
    let callback
    while (callback = callbacks.shift()) {
      callback(this.result)
    }
  }

  /**
   * execute multi promises
   * @param {Array<Promise>} promises - promise or result list
   */
  static all(promises: Array<Promise>) {
    const results = []
    let leftCount = promises.length

    return new Promise(function(resolve, reject) {
      const setResult = function(key, result) {
        results[key] = result

        leftCount--
        if (leftCount === 0) {
          resolve(results)
        }
      }

      promises.forEach(function(promise, key) {
        if (promise instanceof Promise) {
          promise.then(function(result){
            setResult(key, result)
          }, reject)
        } else {
          setResult(key, promise)
        }
      })
    })
  }
}
