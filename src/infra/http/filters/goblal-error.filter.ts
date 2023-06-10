import { Request, Response } from 'express';
import { Response_ } from '../../../domain/error/custom.error';

export async function GlobalFilterError(error, req: Request, res: Response, next) {
  console.error('\x1b[33m' + 'error handle: ', error);

  if (error instanceof Response_) {
    return res.status(error.statusCode).json({
      error: true,
      code: error.code,
      message: error.message,
    });
  } else {
    return res.status(500).json({
      error: true,
      message: 'Internal server error.',
    });
  }
}
