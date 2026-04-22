import {NgFor} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Book} from '../../model/book';
import {Review} from '../../model/review';
import {ReviewCardComponent} from '../review-card/review-card.component';
import {ReviewFormComponent} from '../review-form/review-form.component';

@Component({
  selector: 'bs-book-details',
  standalone: true,
  imports: [RouterLink, NgFor, ReviewCardComponent, ReviewFormComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  readonly book: Book;
  reviews: Review[];

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.reviews = this.activatedRoute.snapshot.data['reviews'] ?? [];
  }

  trackReviewId(index: number, review: Review): number {
    return review.id ?? index;
  }

  addReview(review: Review): void {
    this.reviews = [...this.reviews, review];
  }
}
