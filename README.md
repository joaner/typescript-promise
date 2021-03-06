# typescript-promise

Promise polyfill written by typescript

> Created this project for my personal study typescript

## Usage

The APIs same with Mozilla's [Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const Promise = require('../dist/index.js').default

new Promise(function(resolve, reject) {
  foo(function(response) {
    resolve(response)
  })
}).then(function(result) {
  console.log(result)
}, function(reason) {
  console.error(reason)
}).catch(function(reson) {
  console.error(resaon)
}).finally(function() {
  console.info('done')
})
```

### Static Methods

```javascript
// Promise.all
Promise.all([
  new Promise(),
  'hello',
  Promise.resolve('world'),
])
.then(results => {
  console.log(result)
})
.catch(reason => {
  console.error(reason)
})

// Promise.resolve
Promise.resolve('hello')
.then(result => {
  console.log(result)
})

// Promise.reject
Promise.reject('hello')
.catch(reason => {
  console.error(reason)
})
```

## Command

### Build to JavaScript

```bash
npm install -g typescript

tsc index.ts --outDir dist
# or: npm run build
```

### Function Test

```
npm run test
```
