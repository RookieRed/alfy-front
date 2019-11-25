
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
