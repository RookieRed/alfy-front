import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../../models/address";
import {Country} from "../../../models/country";
import {AddressService} from "../../../services/address.service";

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

  constructor(
    private addressService: AddressService
  ) {
    this.eventEmitter = new EventEmitter<Address>();
  }

  updateCountryList() {
    const search = this.form.value.countryName;
    if (!this.form.controls.countryName.dirty
       || (this.form.controls.countryName.dirty && search.length > 2)) {
      this.addressService.findCountries(search)
        .then(countries => {
            this.countries = (<Country[]>countries);
            this.countries.map(val => {
              if (val.frName == this.form.value.countryName) {
                this.selectedCountry = val;
              }
            });
          },
          err => {
            console.log(err);
        });
    }
    this.onInputChanges();
  }

  onInputChanges() {
    const newAddress = new Address(this.form.value);
    this.eventEmitter.emit(newAddress);
  }

  ngOnInit() {
    this.selectedCountry = new Country({frName: this.form.value.countryName});
    this.address = new Address({
      line1: this.form.value.line1,
      line2: this.form.value.line2,
      city: this.form.value.city,
      country: this.selectedCountry,
    });
    this.updateCountryList();
  }

}
