import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string(),
        email : joi.string().email(),
        password: joi.string(),
})

export const loginUserSchema = joi.object({
        email : joi.string().email(),
})
