import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup } from "@angular/forms";
import {Address} from "../../../models/address";
import {Country} from "../../../models/country";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input('form') form: FormGroup;
  @Output('address') eventEmitter: EventEmitter<Address>;
  address: Address;
  countries: Country[];
  selectedCountry: Country;

  constructor() {
    this.eventEmitter = new EventEmitter<Address>();
  }

  updateCountryList() {

  }

  ngOnInit() {
    this.selectedCountry = new Country({id: this.form.value.countryId});
    this.address = new Address({
      line1: this.form.value.line1,
      line2: this.form.value.line2,
      city: this.form.value.city,
      country: this.selectedCountry,
    });
  }

}
