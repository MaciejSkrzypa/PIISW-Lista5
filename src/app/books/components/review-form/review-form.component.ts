import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewReview, Review} from '../../model/review';
import {ReviewsService} from '../../services/reviews.service';

type ReviewForm = {
  author: FormControl<string>;
  title: FormControl<string>;
  description: FormControl<string>;
};

type ReviewField = keyof ReviewForm;

@Component({
  selector: 'bs-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {
  @Input({ required: true }) bookId!: number;
  @Output() readonly reviewSaved = new EventEmitter<Review>();

  readonly reviewForm: FormGroup<ReviewForm>;
  isSaving = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly reviewsService: ReviewsService,
  ) {
    this.reviewForm = this.formBuilder.group<ReviewForm>({
      author: this.formBuilder.control('', [Validators.required]),
      title: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
    });
  }

  isInvalid(field: ReviewField): boolean {
    const control = this.reviewForm.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  save(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const formValue = this.reviewForm.getRawValue();
    const review: NewReview = {
      forBook: this.bookId,
      author: formValue.author,
      title: formValue.title,
      description: formValue.description,
      rate: 5,
    };

    this.isSaving = true;
    this.reviewsService.saveReview(review).subscribe({
      next: (savedReview) => {
        this.reviewSaved.emit(savedReview);
        this.reviewForm.reset();
        this.isSaving = false;
      },
      error: () => {
        this.isSaving = false;
      },
    });
  }
}
