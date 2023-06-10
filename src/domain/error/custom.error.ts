export interface IResponse {
  data?: object;
  code?: string;
  message?: string;
}

export class Response_ {
  public readonly success: boolean;
  public readonly data?: object;
  public readonly code?: string;
  public readonly message?: string;
  public readonly statusCode: number;

  private constructor(
    success: boolean,
    statusCode: number,
    data?: object,
    code?: string,
    message?: string,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
    this.code = code;
    this.message = message;

    Object.freeze(this);
  }

  public static Ok(data: object) {
    return new Response_(true, 200, data);
  }
  public static Created(data: object) {
    return new Response_(true, 201, data);
  }
  public static NotFoundException(data: IResponse) {
    return new Response_(false, 404, null, data?.code, data?.message);
  }

  public static ConflictException(data: IResponse) {
    return new Response_(false, 409, null, data?.code, data?.message);
  }
}
