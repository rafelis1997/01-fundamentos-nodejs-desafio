import { Database } from "./database.js"
import { buildParamsRegex } from "./utils/build-params-regex.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildParamsRegex('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const data = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return res.writeHead(200).end(JSON.stringify(data))
    }
  },
  {
    method: 'PUT',
    path: buildParamsRegex('/tasks/:taskId'),
    handler: (req, res) => {
      const { title, description } = req.body
      const { taskId } = req.params

      console.log(req.body)

      if (!title && !description) {
        return res.writeHead(400).end("title and description fields are required")
      }

      database.update('tasks', taskId, { title, description })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'POST',
    path: buildParamsRegex('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end("title field is required")
      }

      if (!description) {
        return res.writeHead(400).end("description field is required")
      }

      const data = database.insert('tasks', { title, description })

      return res.writeHead(201).end(JSON.stringify(data))
    }
  },
  {
    method: 'DELETE',
    path: buildParamsRegex('/tasks/:taskId'),
    handler: (req, res) => {
      const { taskId } = req.params

      database.delete('tasks', taskId)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildParamsRegex('/tasks/:taskId'),
    handler: (req, res) => {
      const { taskId } = req.params

      database.updateTaskStatus('tasks', taskId)

      return res.writeHead(204).end()
    }
  },
]