export abstract class UseCaseAdapter<Input, Output> {
  abstract Invoke(input: Input): Output;
}
