const JWT_SECRET_KEY = 'super-secret-key';
// eslint-disable-next-line no-useless-escape
const regular = /^(https|http):\/\/(w{3}\.)?[A-ZА-ЯЁ0-9\-\._~:/?#[\]@!$&'()*\+,;=]+\.[A-ZА-ЯЁ0-9\-\._~:/?#[\]@!$&'()*\+,;=]{2,256}/i;

module.exports = {
  JWT_SECRET_KEY,
  regular,
};
