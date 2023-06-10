import { Request, Response } from 'express';
import { Response_ } from '../../../domain/error/custom.error';

export async function GlobalFilterError(error, req: Request, res: Response, next) {
  console.log(error);
  if (error instanceof Response_) {
    return res.status(error.statusCode).json({
      error: true,
      message: error.message,
      data: error.data ?? null,
    });
  } else {
    return res.status(500).json({
      error: true,
      message: 'Internal server error.',
    });
  }
}
