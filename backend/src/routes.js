const express = require("express")
const { celebrate, Segments, Joi } = require("celebrate")

const OngController = require("./controllers/OngController")
const SessionController = require("./controllers/SessionController")
const ProfileController = require("./controllers/ProfileController")
const IncidentController = require("./controllers/IncidentController")

const routes = express.Router()

routes.post("/sessions", celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required()
    })
}), SessionController.create)

routes.get("/ongs", OngController.index)

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index)

routes.get("/incidents", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index)

routes.post("/incidents", celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().max(40),
        description: Joi.string().required().max(140),
        value: Joi.number().required()
    }),
    
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.create)

routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete)

module.exports = routes