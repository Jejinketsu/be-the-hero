const knex = require("knex")
const configuration = require("../../knexfile")

const connectionn = knex(configuration.development)

module.exports = connectionn