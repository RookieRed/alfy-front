export class File {

  private name: string;
  private path: string;
  private fullPath: string;


  constructor(obj?: {name?: string, path?: string, fullPath?: string}) {
    if (obj != null) {
      this.name = obj.name;
      this.path = obj.path;
      this.fullPath = obj.fullPath;
    }
  }
}
