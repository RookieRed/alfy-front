import {User} from "./user";
import {TimedWritableContent} from "./timed.writable.content";
import {Section} from "./sections";

export class Page extends TimedWritableContent {
  title: string;
  // Mapping { "code-section-a": SectionA, "code-section-b": SectionB, ... }
  sections: { [key: string]: Section };


  constructor(obj?: { createdAt?: Date; updatedAt?: Date; lastWriter?: User }, obj2?: {title?: string, sections?: { [p: string]: Section }}) {
    super(obj);
    if ( obj2 != null ) {
      this.title = obj2.title;
      this.sections = obj2.sections;
    }
  }
}
