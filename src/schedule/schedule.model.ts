interface BookedRoom {
  _id: string;
  room: number;
  bookedBy: string;
  bookedFor: string;
  isPaid: boolean;
}

export class ScheduleModel {
  date: Date;
  availableRooms: number[];
  bookedRooms: BookedRoom[];
}
