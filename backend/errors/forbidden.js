const FORBIDDEN_CODE = 403;
class Forbidden extends Error {
  constructor(
    message = 'Недостаточно пользовательских прав для совершения действия',
  ) {
    super(message);
    this.code = FORBIDDEN_CODE;
  }
}

module.exports = Forbidden;
