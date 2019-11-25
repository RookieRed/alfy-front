import {Country} from "./country";

export class Address {

  id: number;
  line1: string;
  region: string;
  city: string;
  country: Country;

  public constructor(obj?: {
    id?: number,
    line1?: string,
    region?: string,
    city?: string,
    country?: Country,
  }) {
    if (obj != null) {
      this.id = obj.id;
      this.line1 = obj.line1;
      this.region = obj.region;
      this.city = obj.city;
      this.country = obj.country;
    }
  }

}
