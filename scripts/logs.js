#!/usr/bin/env node

var data = ''
function withPipe (data) {
  console.log('content was piped')
  console.log(data.trim())
}
function withoutPipe () {
  console.log('no content was piped')
}

var self = process.stdout
self.on('readable', function () {
  var chunk = this.read()
  if (chunk === null) {
    withoutPipe()
  } else {
    data += chunk
  }
})
self.on('end', function () {
  withPipe(data)
})
