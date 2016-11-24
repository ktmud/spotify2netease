#!/usr/bin/env node

const getStdin = require('get-stdin')
const csv = require('csv')

process.stdin
  .pipe(csv.parse())
  .pipe(csv.transform(function(item) {
    return `
    <File>
      <FileName><![CDATA[${item[2]} - ${item[1]}]]></FileName>
    </File>`
  }))
  .pipe(csv.stringify(function(err, items) {
    console.log(`<?xml version="1.0" encoding="windows-1252"?>
    <List ListName="Spotify List">
      ${items}
    </List>`)
  }))
