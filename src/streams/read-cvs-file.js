import { parse } from "csv-parse";
import fs from 'node:fs'

const csvFile = new URL("./file.csv", import.meta.url)

const stream = fs.createReadStream(csvFile)

const parser = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2,
})

async function run() {
  const linesParse = stream.pipe(parser)
  
  for await (const line of linesParse) {
    const [title, description] = line
    
    const data = await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
    await wait(1000)
  }
  
}

run()

function wait(seconds) { 
  return new Promise((resolve) => {
    setTimeout(resolve, seconds)
  })
}