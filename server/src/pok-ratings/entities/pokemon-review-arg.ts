import { PokRating } from '.';

export interface StarRating {
  count: number;
  value: number;
}

export class PokemonReviewAgr {
  totalReviews: number = 0;
  starsRatings: Record<number, StarRating> = {
    1: {
      count: 0,
      value: 1,
    },
    2: {
      count: 0,
      value: 2,
    },
    3: {
      count: 0,
      value: 3,
    },
    4: {
      count: 0,
      value: 4,
    },
    5: {
      count: 0,
      value: 5,
    },
  };
  average: number = 0;

  addRating(review: PokRating) {
    this.average =
      (this.average * this.totalReviews + review.rating) / this.totalReviews +
      1;
    this.totalReviews++;

    this.starsRatings[review.rating].count++;
  }

  deleteRating(review: PokRating) {
    this.average =
      (this.average * this.totalReviews - review.rating) / this.totalReviews -
      1;

    this.totalReviews--;
    this.starsRatings[review.rating].count--;
  }

  editRating(oldReview: PokRating, newReview: PokRating) {
    this.deleteRating(oldReview);
    this.addRating(newReview);
  }
}
