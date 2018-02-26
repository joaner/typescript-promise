export default class Promise {
  public status: String = 'pending'
  private result: any

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

  then(resolve: Function, reject?: Function) {
    this.resolves.push(resolve)
    if (reject) {
      this.rejects.push(reject)
    }

    if (this.status === 'rejected') {
      this.callback(this.rejects)
    } else if (this.status === 'fulfilled') {
      this.callback(this.resolves)
    }
  }

  catch(reject: Function) {
    this.rejects.push(reject)
  }

  fulfilled(result) {
    this.status = 'fulfilled'
    this.result = result

    this.callback(this.resolves)
  }

  rejected(reason) {
    this.status = 'rejected'
    this.result = reason

    this.callback(this.rejects)
  }

  callback(callbacks) {
    let callback
    while (callback = callbacks.shift()) {
      callback(this.result)
    }
  }

  static all(promises: Array<Promise>) {
    console.log(promises)
  }
}
