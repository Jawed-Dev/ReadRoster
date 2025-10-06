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

export interface BooksDto {
    idGoogleBook: string;
    favory: boolean;
    read: boolean;
    toRead: boolean;
    reading: boolean;
}

export interface SearchPayload {
    title: string;
}


export interface UpdateStatusPayload {
    idGoogleBook: string;
    status: {id: number, label: string, checked: boolean}[];
}