import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../model/book';
import {BooksService} from '../../services/books.service';

type BookEditForm = {
  title: FormControl<string>;
  author: FormControl<string>;
  year: FormControl<number>;
  description: FormControl<string>;
};

type BookEditField = keyof BookEditForm;

@Component({
  selector: 'bs-book-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {

  readonly book: Book;
  readonly bookForm: FormGroup<BookEditForm>;
  isSaving = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly booksService: BooksService,
    private readonly router: Router,
  ) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.bookForm = this.formBuilder.group<BookEditForm>({
      title: this.formBuilder.control(this.book.title, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      author: this.formBuilder.control(this.book.author, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      year: this.formBuilder.control(this.book.year, [
        Validators.required,
        Validators.min(1000),
        Validators.max(2023),
      ]),
      description: this.formBuilder.control(this.book.description ?? '', [
        Validators.maxLength(1000),
      ]),
    });
  }

  isInvalid(field: BookEditField): boolean {
    const control = this.bookForm.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  save(): void {
    if (this.bookForm.invalid || this.bookForm.pristine) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const updatedBook: Book = {
      ...this.book,
      ...this.bookForm.getRawValue(),
    };

    this.isSaving = true;
    this.booksService.saveBook(updatedBook).subscribe({
      next: () => void this.router.navigate(['/books']),
      error: () => {
        this.isSaving = false;
      },
    });
  }

  cancel(): void {
    void this.router.navigate(['/books']);
  }
}
