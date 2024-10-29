const Joi = require('joi')
const  mongoose = require("mongoose")
const validationSchema = {
    createAgencyAndClient: Joi.object({
        agencyDetails:Joi.object({
            name: Joi.string().required(),
            address1: Joi.string().required(),
            address2: Joi.string().optional(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            phoneNumber: Joi.string().pattern(/^[0-9]+$/).required(),
            agencyId:Joi.string().optional()
        }).required(),
        clientDetails: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().pattern(/^[0-9]+$/).required(),
            totalBill: Joi.number().required()
        }).required()

    }),
    updateClient:Joi.object({
        clientId: Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('Invalid agency ID');
            }
            return value;
        }).required(),
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phoneNumber: Joi.string().pattern(/^[0-9]+$/).optional(),
        totalBill: Joi.number().optional()
    })
}
module.exports = validationSchema