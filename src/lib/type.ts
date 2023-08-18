type API_RESULT = {
    vocab: string;
    pos: string;
    definitions: Array<{
        definition: string;
        example: string;
        thumbs_up: number;
        thumbs_down: number;
    }>
}
