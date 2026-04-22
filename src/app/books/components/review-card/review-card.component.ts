import {Component, Input} from '@angular/core';
import {Review} from '../../model/review';

@Component({
  selector: 'bs-review-card',
  standalone: true,
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {
  @Input({ required: true }) review!: Review;
}
