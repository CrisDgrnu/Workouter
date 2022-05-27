export class GenericHttpError {
  constructor(
    private statusCode: number,
    private messages: string[],
    private error: string,
  ) {}
}
