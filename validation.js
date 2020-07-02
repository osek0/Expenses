const Joi = require('joi');

function validateData(reqBody) {

  const schema = Joi.object({
    amount: Joi.number()
      .positive()
      .required(),
    date: Joi.date()
      .required(),
    category: Joi.string()
      .valid([
        'Jedzenie',
        'Środki czystości',
        'Higiena',
        'Hobby/Sport',
        'Rozrywka',
        'Odzież',
        'Inne'
      ])
      .required(),
    info: Joi.string()
      .min(3)
      .max(256)
  });

  return schema.validate(reqBody);
}

module.exports.validation = validateData;