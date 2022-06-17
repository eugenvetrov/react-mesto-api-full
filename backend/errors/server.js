const SERVER_ERROR_CODE = 500;
class ServerError extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.code = SERVER_ERROR_CODE;
  }
}

module.exports = ServerError;
