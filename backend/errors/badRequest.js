const BAD_REQUEST_ERROR_CODE = 400;
class BadRequestError extends Error {
  constructor(
    message = 'Сервер не смог понять запрос из-за недействительного синтаксиса',
  ) {
    super(message);
    this.code = BAD_REQUEST_ERROR_CODE;
  }
}

module.exports = BadRequestError;
