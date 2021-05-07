#!/usr/bin/env node

require('dotenv/config')

const Airtable = require('airtable')
const fse = require('fs-extra')
const stringify = require('json-stringify-pretty-compact')

const config = require(`${process.cwd()}/airtable-export.config.json`)

Airtable.configure({ apiKey: process.env.AIRTABLE_PERSONAL_KEY })

const base = Airtable.base(process.env.AIRTABLE_BASE_ID)

const exportTableData = (tableName, fileName, view) => {
  const data = {}
  return new Promise(resolve => {
    base(tableName)
      .select(view ? { view } : undefined)
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach(record => {
            data[record.id] = {
              ...record._rawJson.fields,
              id: record.id,
              createdAt: record._rawJson.createdTime,
            }
          })
          fetchNextPage()
        },
        err => {
          if (err) {
            console.error(err)
            return
          }
          fse.outputFileSync(fileName, stringify(data))
          resolve(true)
        }
      )
  })
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const main = async () => {
  asyncForEach(config.tables, async ([tableName, exportPath, view]) =>
    exportTableData(tableName, exportPath, view)
  )
}

main()
