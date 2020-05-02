export class ApiFile {

  name: string;
  path: string;
  fullPath: string;
  config: any;


  constructor(obj?: { name?: string, path?: string, fullPath?: string }) {
    if (obj != null) {
      this.name = obj.name;
      this.path = obj.path;
      this.fullPath = obj.fullPath;
    }
  }
}
