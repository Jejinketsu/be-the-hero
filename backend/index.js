const express = require("express")

const app = express()

app.get("/", (require, response) => {
    return response.json({
        evento: "semana omnistack 11.0",
        aluno: "Jederilson"
    })
})

app.listen(3333)