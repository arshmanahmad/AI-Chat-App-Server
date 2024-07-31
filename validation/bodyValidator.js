import httpStatus from 'http-status'

const bodyValidator = (schema) => async (req, res, next) => {
    const { body } = req;
    try {
        const isValid = await schema.validateAsync({
            ...body,
        })
        next();
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).json({ error: err.message })
    }
}

export default bodyValidator