import {Moment} from "moment";

export class Project {

  startedAt: Date | Moment;
  endedAt: Date | Moment;
  title: string;
  details: string;


  constructor(obj?: {startedAt: Date | Moment, endedAt: Date | Moment, title: string, details: string}) {
    if ( obj != null ) {
      this.startedAt = obj.startedAt;
      this.endedAt = obj.endedAt;
      this.title = obj.title;
      this.details = obj.details;
    }
  }
}
