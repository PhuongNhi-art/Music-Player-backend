const Joi = require('joi');
class UserValidation {


    registerValidation(data) {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),

            repeat_password: Joi.ref('password'),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });

        return schema.validate(data);
    }
    loginValidation(data) {
        const schema = Joi.object({
            password: Joi.string()
                .required(),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });
        return schema.validate(data);
    }
}

module.exports = new UserValidation;
