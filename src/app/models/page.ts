import {User} from "./user";
import {Section} from "./sections";

export class TimedWritableContent {
  createdAt?: Date;
  updatedAt?: Date;
  lastWriter?: User;
}

export class Page extends TimedWritableContent {
  title: string;
  // Mapping { "code-section-a": SectionA, "code-section-b": SectionB, ... }
  sections: { [key: string]: Section };
}
