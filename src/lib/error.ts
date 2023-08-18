export class DefinitionsNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DefinitionsNotFoundError';
    }
}