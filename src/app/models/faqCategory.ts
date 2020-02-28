export class Category {

  id: number;
  name: string;
  description: string;
  orderIndex: number;

  public constructor(obj?: {id?: number,
            name?: string,
            description?: string,
            orderIndex?: number, }) {
    if (obj != null) {
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.orderIndex = obj.orderIndex;
    }
  }
}
