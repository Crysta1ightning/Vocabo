export class DefinitionsNotFoundError extends Error {
    constructor(message: string) {
        super("Definitions not found for " + message);
        this.name = 'DefinitionsNotFoundError';
    }
}