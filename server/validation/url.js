const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateURLInput(data) {
  let errors = {};

  data.curlThis = !isEmpty(data.curlThis) ? data.curlThis : "";

  if (!Validator.isURL(data.curlThis, { require_tld: true })) {
    errors.curlThis = "This is not a valid URL";
  }

  if (Validator.isEmpty(data.curlThis)) {
    errors.curlThis = "Please enter any URL or IP";
  }

  // if (
  //   !Validator.isURL(data.curlThis, {
  //     protocols: ["http", "https", "ftp"],
  //     require_protocol: true
  //   })
  // ) {
  //   errors.curlThis = "Enter a valid URL. Example:  https://example.com";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
    // isURL
  };
};
