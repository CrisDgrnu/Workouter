export class GenericHttpError {
  constructor(
    private statusCode: number,
    private message: string[],
    private error: string,
  ) {}
}
