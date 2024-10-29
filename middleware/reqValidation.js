module.exports={
    validate: function (schema) {
        return async (req, res, next) => {
          const { error,value } = schema.validate(req.body);
          const valid = error == null;
          if (valid) {
            req.body = value;
            next();
          } else {
            await this.failActionFunction(res, error);
          }
        };
      },
      failActionFunction: function (reply, error) {
        var errorMSG = error.details[0].message;
        var data = {
          data: error.details[0].context.key,
          success:false
        };
        data.message = errorMSG.toString().replace(/\\/g, " ");
        return reply.status(400).send(data);
      },
}