/** @format */

export interface ApiError<T = void> {
  code: string;
  description: string;
  details?: T;
}
