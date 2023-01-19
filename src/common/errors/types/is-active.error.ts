export class IsActiveError extends Error {
  constructor() {
    super('User is not active');
    this.name = 'IsActiveError';
  }
}
