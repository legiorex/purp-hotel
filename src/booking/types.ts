import { BookingModel } from './model/booking.model';

export type BookingFields = {
  [K in keyof BookingModel]?: BookingModel[K];
};
