import {ApiFile} from "./file";

export class EventTile {
  id: number;
  title: string;
  description?: string;
  link?: string;
  date?: Date;
  photo?: ApiFile;

  constructor(obj?: { id?: number, title?: string, description?: string, link?: string, date?: Date, photo?: ApiFile }) {
    if (obj != null) {
      this.id = obj.id;
      this.title = obj.title;
      this.description = obj.description;
      this.link = obj.link;
      this.date = obj.date;
      this.photo = obj.photo;
    }
  }
}
