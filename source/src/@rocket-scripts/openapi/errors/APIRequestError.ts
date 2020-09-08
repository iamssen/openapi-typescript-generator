export class APIRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIRequestError';
  }
}
