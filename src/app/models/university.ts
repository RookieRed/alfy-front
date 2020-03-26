import {Address} from "./address";

export class University {

  id: number;
  name: string;
  address: Address;


  constructor(obj?: {id: number, name: string, address: Address} ) {
    if ( obj != null ) {
      this.id = obj.id;
      this.name = obj.name;
      this.address = obj.address;
    }
  }

}
