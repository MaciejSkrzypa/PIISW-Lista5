import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Book} from '../model/book';
import {BooksService} from '../services/books.service';

export const bookDetailsResolver: ResolveFn<Book> = (
  route: ActivatedRouteSnapshot,
) => {
  const bookId = Number(route.paramMap.get('bookId'));
  return inject(BooksService).findBookById(bookId);
};
