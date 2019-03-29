const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateURLInput(data) {
  let errors = {};

  data.curlThis = !isEmpty(data.curlThis) ? data.curlThis : '';

  if (
    !Validator.isURL(data.curlThis, {
      require_tld: true,
      require_valid_protocol: true,
      allow_protocol_relative_urls: false
    })
  ) {
    errors.curlThis = 'This is not a valid URL';
  }

  if (Validator.isEmpty(data.curlThis)) {
    errors.curlThis = 'Please enter any URL or IP';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
