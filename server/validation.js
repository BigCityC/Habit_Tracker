import Joi from 'joi'

//validation
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    type: Joi.string().min(5).required()
  })
  return schema.validate(data)

}

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  })
  return schema.validate(data)

}

export { registerValidation, loginValidation }

