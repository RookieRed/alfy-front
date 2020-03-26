import {Address} from "./address";

export class University {

  private id: number;
  private name: string;
  private address: Address;


  constructor(obj?: {id: number, name: string, address: Address} ) {
    if ( obj != null ) {
      this.id = obj.id;
      this.name = obj.name;
      this.address = obj.address;
    }
  }

}
