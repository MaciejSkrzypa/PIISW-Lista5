import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const booksApiPrefix = '/api/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private readonly http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(booksApiPrefix);
  }

  // Task 1: load a single book for the details and edit routes.
  findBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${booksApiPrefix}/${bookId}`);
  }

  // Task 2: persist edited book data through the REST endpoint.
  saveBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${booksApiPrefix}/${book.id}`, book);
  }
}
