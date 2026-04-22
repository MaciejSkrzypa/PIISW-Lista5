import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Review} from '../model/review';
import {ReviewsService} from '../services/reviews.service';

export const reviewListResolver: ResolveFn<Review[]> = (
  route: ActivatedRouteSnapshot,
) => {
  const bookId = Number(route.paramMap.get('bookId'));
  return inject(ReviewsService).findReviewsByBookId(bookId);
};
