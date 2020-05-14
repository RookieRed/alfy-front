import {Moment} from "moment";
import {University} from "./university";

export class Study {

  id: number;
  type: string;
  university: University;
  startedAt: Date | Moment;
  monthsDuration: number;
  comment: string;
  notation: number;


  constructor(obj?: { id: number, type: string, university: University, startedAt: Date | Moment, monthsDuration: number, comment: string, notation: number }) {
    if (obj != null) {
      this.id = obj.id;
      this.type = obj.type;
      this.university = obj.university;
      this.startedAt = obj.startedAt;
      this.monthsDuration = obj.monthsDuration;
      this.comment = obj.comment;
      this.notation = obj.notation;
    }
  }
}
