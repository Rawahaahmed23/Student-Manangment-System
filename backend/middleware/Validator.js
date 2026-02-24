const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.validate(req.body, { abortEarly: false });
        req.body = parsedBody;
        next();
    } catch (error) {
        const status = 400;
        const message = 'Fill input properly';

     
            const extraDetails = error.errors?.[0]; 

    
        const errorObj = { status, message, extraDetails };

      
        next(errorObj); 
    }
};

module.exports = validate;
