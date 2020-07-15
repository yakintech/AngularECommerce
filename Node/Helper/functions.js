function findByEmail(schema, email) {
    return schema.findOne({ email: email })
};

module.exports = {
    findByEmail
}