interface APIExceptionErrorParams<T> {
  exception: T;
  message: string;
  response: Response;
}

export class APIExceptionError<T> extends Error {
  readonly exception: T;
  readonly response: Response;

  constructor({ exception, message, response }: APIExceptionErrorParams<T>) {
    super(message);

    this.name = 'APIExceptionError';

    this.exception = exception;
    this.response = response;
  }
}
