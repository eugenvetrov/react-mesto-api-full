const CONFLICT_ERROR_CODE = 409;
class ConflictError extends Error {
  constructor(message = 'Конфликт запроса с текущим состоянием сервера') {
    super(message);
    this.code = CONFLICT_ERROR_CODE;
  }
}

module.exports = ConflictError;
