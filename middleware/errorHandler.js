const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Fields",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorizedss",
        message: err.message,
        stackTrace: err.stack,
      });
      case constants.FORBIDDEN:
      res.json({
        title: "Forbidded",
        message: err.message,
        stackTrace: err.stack,
      });
      case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
        console.log("No Error,", res.statusCode)
      break;
  }
};

module.exports = errorHandler;
