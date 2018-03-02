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
}).then(function(response) {
  console.log('the response is ', response)
}, function(reason) {
  console.log('error', reason)
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
