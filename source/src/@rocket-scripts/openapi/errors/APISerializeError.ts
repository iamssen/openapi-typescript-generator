export class APISerializeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APISerializeError';
  }
}
