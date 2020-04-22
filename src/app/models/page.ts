import {TimedWritableContent} from "./timed.writable.content";
import {Section} from "./sections";

export class PageInfo {
  public title: string;
  public contents: PageContent[];
  public files: PageFile[];
}

export class PageContent {
  public id: number;
  public title: string;
  public html: string;
}

export class PageFile {
  public id: number;
  public path: string;
  public options: any;
}

interface Page extends TimedWritableContent {
  title: string;
  // Mapping { "code-section-a": SectionA, "code-section-b": SectionB, ... }
  sections: { [key: string]: Section };
}
