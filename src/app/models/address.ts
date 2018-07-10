import {Country} from "./country";

export class Address {

  id: number;
  line1: string;
  line2: string;
  city: string;
  country: Country;

  public constructor(obj?:{
    id?: number,
    line1?: string,
    line2?: string,
    city?: string,
    country?: Country,
  }) {
    if (obj != null) {
      this.id = obj.id;
      this.line1 = obj.line1;
      this.line2 = obj.line2;
      this.city = obj.city;
      this.country = obj.country;
    }
  }

}
