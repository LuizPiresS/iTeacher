export interface IHashingService {
  hashingPassword(password: string, salt: number): Promise<string>;
}
