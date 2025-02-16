export interface BooksDto {
    title : string;
    idGoogle : string;
    authors : string;
}

export interface BooksResponse<T> {
    success: boolean;
    errorMessage: string | null;
    data: T;
  }