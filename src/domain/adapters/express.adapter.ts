import { NextFunction, Response } from 'express';
import { Response_ } from '../error/custom.error';

export class HttpResponse {
  status?: number;
  json?: object | string | null;
  cookie?: { name: string; value: string };

  constructor(props: {
    status?: number;
    json?: object;
    cookie?: { name: string; value: string };
  }) {
    this.status = props?.status;
    this.json = props?.json;
    this.cookie = props?.cookie;
  }
}

export type IController = (body, params?, next?) => Promise<Response_>;

/**
 * @description This interceptor is responsible for handling all exceptions that occur in the routes. It encompasses all routes
 * in a single place and ensures that error and successful responses are handled in one place.
 */
export function InterceptorResponse(
  controller: IController,
  infos?: 'add-user-infos' | 'not-user-infos',
) {
  return async function (req, res: Response, next: NextFunction) {
    const body = req.body;
    const params = req.params;
    const query = req.query;
    const cookie = req.cookie;

    try {
      if (infos === 'add-user-infos') {
        body.user_infos = req.user_infos;
        body.cookie = cookie;
      }

      const response: Response_ = await controller(body, params, query);

      // if (response.cookie?.name && response.cookie?.value) {
      //   res.cookie(response.cookie.name, response.cookie.value, { httpOnly: true });
      // }
      console.log(response);
      return res.status(response?.statusCode || 200).json({
        data: response?.data,
        success: response.success,
      });
    } catch (e) {
      /**
       * Sending error throws to an Express error filter.
       */
      return next(e);
    }
  };
}
