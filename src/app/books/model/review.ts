export interface Review {
  id?: number;
  forBook: number;
  author?: string;
  title: string;
  description: string;
  rate: number;
}

export type NewReview = Omit<Review, 'id'>;
