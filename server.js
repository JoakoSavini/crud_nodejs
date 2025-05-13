const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const userRouter = require('./routes/usuarios.routes')
app.use('/usuarios', userRouter)

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`)
})