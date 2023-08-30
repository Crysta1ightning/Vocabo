// before parse
type Urbandictionary_Definition = {
    definition: string
    example: string
    thumbs_up: number
    thumbs_down: number
};

// after parse
type UrbanDictionary_Result = {
    vocab: string
    definitions: {
        definition: string
        example: string
        thumbs_up: number
        thumbs_down: number
    }[]
}