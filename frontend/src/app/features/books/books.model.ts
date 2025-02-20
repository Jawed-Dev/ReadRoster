export interface GoogleBooksDto {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
}

export interface SearchPayload {
    title: string;
}