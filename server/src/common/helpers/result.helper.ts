import { HttpException } from '@nestjs/common';

export class Result<T> {
  success(code: number, message: string, data?: T) {
    return {
      code,
      message,
      data,
    };
  }

  error(code: number, message: string) {
    return new HttpException(
      {
        code,
        message,
      },
      code,
    );
  }
}
