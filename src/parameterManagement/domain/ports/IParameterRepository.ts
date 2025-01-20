export interface IParameterRepository {
  get(key: string): Promise<string | null>;
}
