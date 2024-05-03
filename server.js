const express = require("express")
const app = express()
const cors = require("cors")
const serverPort =  process.env.SERVER_PORT || 3000
const excelRota = require("./routes/excel")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use("",excelRota)

app.listen(serverPort, () => console.log(`Servidor aberto: http://localhost:${serverPort}`))