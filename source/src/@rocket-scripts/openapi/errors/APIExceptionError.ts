interface APIExceptionErrorParams<T> {
  exception: T;
  message: string;
  response: Response;
}

export class APIExceptionError<T> extends Error {
  readonly exception: T;
  readonly message: string;
  readonly response: Response;
  
  constructor({ exception, message, response }: APIExceptionErrorParams<T>) {
    super();
    
    this.name = 'APIExceptionError';
    
    this.exception = exception;
    this.message = message;
    this.response = response;
  }
}