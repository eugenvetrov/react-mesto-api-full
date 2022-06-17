const NOT_FOUND_ERROR_CODE = 404;
class NotFoundError extends Error {
  constructor(message = 'данные не найдены') {
    super(message);
    this.code = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = NotFoundError;
