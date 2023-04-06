import fs from 'fs/promises'
import { randomUUID } from 'node:crypto'

const pathDatabase = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(pathDatabase, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    
    return data
  }

  insert(table, data) {

    if (Array.isArray(data)) {
      if (table === 'tasks') {
        const tasksArray = data.map(task => {
          const taskFormatted = {
            id: randomUUID(),
            ...task,
            created_at: new Date(),
            updated_at: null,
            completed_at: null,
          }
  
          return taskFormatted
        })
  
        this.#database[table].push(tasksArray)
      } else {
        this.#database[table].push(data)
      }
    } else {
      if (table === 'tasks') {
        const taskFormatted = {
          id: randomUUID(),
          ...data,
          created_at: new Date(),
          updated_at: null,
          completed_at: null,
        }
        this.#database[table] = [...this.#database[table], taskFormatted]
      } else {
        this.#database[table] = [...this.#database[table], data]
      }
    }
    this.#persist()

    return data
  }

  update(table, id, data) {
    const { title, description } = data

    const taskIndex = this.#database[table].findIndex(task => task.id === id)

    if (taskIndex === -1) return;

    if (title && description) { 
      this.#database[table][taskIndex].title = title
      this.#database[table][taskIndex].description = description
      this.#database[table][taskIndex].updated_at = new Date()
    }

    if (!description && title) {
      this.#database[table][taskIndex].title = title
      this.#database[table][taskIndex].updated_at = new Date()
    }

    if (description && !title) {
      this.#database[table][taskIndex].description = description
      this.#database[table][taskIndex].updated_at = new Date()
    }

    this.#persist()
  }

  updateTaskStatus(table, id) {
    const taskIndex = this.#database[table].findIndex(task => task.id === id)

    if (taskIndex === -1) return;

    this.#database[table][taskIndex].completed_at = this.#database[table][taskIndex].completed_at ?
      null : new Date()

    this.#persist()
  }

  delete(table, id) {
    const taskIndex = this.#database[table].findIndex(task => task.id === id)

    if (taskIndex > -1) {
      this.#database[table].splice(taskIndex, 1)
      this.#persist()
    }
  }

  #persist() {
    fs.writeFile(pathDatabase, JSON.stringify(this.#database))
  }
}