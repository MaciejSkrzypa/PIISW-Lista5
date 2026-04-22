import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewReview, Review } from '../model/review';

const reviewsApiPrefix = '/api/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private readonly http: HttpClient) { }

  // Task 3: load reviews for the selected book.
  findReviewsByBookId(bookId: number): Observable<Review[]> {
    const params = new HttpParams().set('forBook', bookId);
    return this.http.get<Review[]>(reviewsApiPrefix, { params });
  }

  // Task 4: save a newly created review.
  saveReview(review: NewReview): Observable<Review> {
    return this.http.post<Review>(reviewsApiPrefix, review);
  }
}
