import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string(),
        email : joi.string().email(),
        phone_number: joi.string().min(10),
        password: joi.string(),
        confirm_password: joi.string()

})

export const loginUserSchema = joi.object({
        email : joi.string().email(),
})
