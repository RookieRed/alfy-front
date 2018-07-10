export class Country {

  id: number;
  frName: string;
  enName: string;
  code: string;

  public constructor(obj?: {
    id?: number;
    frName?: string;
    enName?: string;
    code?: string;
  }) {
    if (obj != null) {
      this.id = obj.id;
      this.frName = obj.frName;
      this.enName = obj.enName;
      this.code = obj.code;
    }
  }
}
