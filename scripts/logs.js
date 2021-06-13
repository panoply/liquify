#!/usr/bin/env node

let data = ''

function withPipe (data) {
  console.log('content was piped')
  console.log(data.trim())
}
function withoutPipe () {
  console.log('no content was piped')
}

const self = process.stdout

self.on('readable', function () {
  const chunk = this.read()
  if (chunk === null) {
    withoutPipe()
  } else {
    data += chunk
  }
})

self.on('end', function () {
  withPipe(data)
})
