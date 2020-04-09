import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class XyzErrorHandlerService extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error) {
    const date = new Date();

    console.error('There was an error:', {
      timestamp: date.toISOString(),
      message: error.message,
      zone: error.zone,
      task: error.task,
    });
  }
}
