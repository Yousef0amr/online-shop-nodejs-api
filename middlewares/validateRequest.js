
const validateRequset = (schema) => (req, res, next) => {

    const { error, value } = schema.validate({ ...req.body })
    if (error) {
        return res.json({ error })
    }
    return next()
}

export default validateRequset