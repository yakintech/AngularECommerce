function findByEmail(schema, email) {
  return schema.findOne({ email: email });
}
function findByCode(schema, code) {
  return schema.findOne({ code: code });
}

module.exports = {
  findByEmail,
  findByCode,
};
