interface BookedRoom {
  _id: string;
  room: number;
  bookedBy: string;
  bookedFor: string;
  bookedStart: Date;
  bookedEnd: Date;
  isPaid: boolean;
}

export class ScheduleModel {
  date: Date;
  availableRooms: number[];
  bookedRooms: BookedRoom[];
}
