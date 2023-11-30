import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string(),
        email : joi.string().email(),
        password: joi.string(),
        confirm_password: joi.string(),

})

export const userLoginValidationSchema = joi.object({
        email:joi.string().email({
            minDomainSegments:2,tlds : {
                allow :['ke','com']
    
            }
        }),
        password:joi.string().required()
    
    });
    