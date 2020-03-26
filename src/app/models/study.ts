import {Moment} from "moment";
import {University} from "./university";

export class Study {

  private id: number;
  private type: string;
  private university: University;
  private startedAt: Date | Moment;
  private monthsDuration: number;
  private comment: string;
  private notation: number;


  constructor(obj?: {id: number, type: string, university: University, startedAt: Date | Moment, monthsDuration: number, comment: string, notation: number}) {
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
