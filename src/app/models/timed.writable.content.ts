import {User} from "./user";

export class TimedWritableContent {

  createdAt: Date;
  updatedAt: Date;
  lastWriter: User;


  constructor(obj?: {
    createdAt?: Date,
    updatedAt?: Date,
    lastWriter?: User
  }) {
    if (obj != null) {
      this.createdAt = obj.createdAt;
      this.updatedAt = obj.updatedAt;
      this.lastWriter = obj.lastWriter;
    }
  }
}
