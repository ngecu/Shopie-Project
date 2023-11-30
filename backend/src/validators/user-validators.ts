import Joi from "joi";


export const validateUserEmail = Joi.object().keys({
    email: Joi.string().email().required(),
  });

export const validateResetpassword = Joi.object().keys({
    user_id: Joi.string().min(8).required(),
    password: Joi.string().pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    ),
  });