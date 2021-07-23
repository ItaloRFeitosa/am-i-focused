export abstract class DomainError extends Error {
  constructor(name, message) {
    super(`DomainError: ${message}`);
    this.name = `DomainError:${name}`;
  }
}

export const isDomainError = (value: any): value is DomainError => value instanceof DomainError

