export class EmailAlreadyInUseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorEmailAlreadyInUse';
  }
}
