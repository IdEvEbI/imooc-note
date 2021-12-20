import * as http from 'http'
import serverHandle from '../app'

const PORT = 8000
const server = http.createServer(serverHandle)

server.listen(PORT, () => {
  console.log(`server is runing on http://localhost:${PORT}`)
})
