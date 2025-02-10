export interface BooksDto {
    idGoogle : number;
}

export interface BooksResponse<T> {
    success: boolean;
    errorMessage: string | null;
    data: T;
  }