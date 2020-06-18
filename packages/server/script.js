#!/usr/bin/env node

/* const { copySync, statSync } = require('fs-extra')
const modules = [
  'vscode-languageserver-protocol',
  'vscode-languageserver-types',
  'vscode-html-languageservice',
  'vscode-json-languageservice'
]

modules.forEach(i => {
  try {

    copySync(
      `./../../node_modules/${i}`,
      `./dist/node_modules/${i}`
    )
  } catch (e) {
    console.log(e)
  }

})

/*
!client/node_modules/vscode-jsonrpc/**
!client/node_modules/vscode-languageclient/**
!client/node_modules/vscode-languageserver-protocol/**
!client/node_modules/vscode-languageserver-types/**
!client/node_modules/semver/**
*/
