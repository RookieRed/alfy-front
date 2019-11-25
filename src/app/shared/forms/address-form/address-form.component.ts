import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../../models/address";
import {Country} from "../../../models/country";
import {AddressService} from "../../../services/address.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input('form') form: FormGroup;
  @Output('address') addressEmitter: EventEmitter<Address>;
  address: Address;
  countries: Country[];
  selectedCountry: Country;
  countrySearchCtl: FormControl;
  private allCountries: Country[];

  constructor(
    private addressService: AddressService
  ) {
    this.addressEmitter = new EventEmitter<Address>(true);
    this.selectedCountry = null;
    this.countrySearchCtl = new FormControl();
  }

  getAllCountries() {
    this.addressService.findCountries()
      .then(countries => {
          this.countries = (<Country[]>countries);
          this.allCountries = Object.assign([], this.countries);
          this.countries.map(val => {
            if (val.id === this.form.value.countryId) {
              this.selectedCountry = val;
              this.address.country = val;
              this.form.controls.countryId.setErrors(null);
            }
          });
        },
        (err) => {
          console.error(err);
      });
  }

  onInputChanges() {
    const newAddress = new Address(this.form.value);
    newAddress.country = this.selectedCountry;
    this.addressEmitter.emit(newAddress);
  }

  onSelectCountry(country?: Country) {
    this.selectedCountry = country;
    this.countrySearchCtl.reset();
    this.filterCountries();
    this.onInputChanges();
  }

  ngOnInit() {
    this.address = new Address({
      line1: this.form.value.line1,
      region: this.form.value.region,
      city: this.form.value.city,
      country: new Country({
        id: this.form.value.countryId
      })
    });
    this.getAllCountries();
    this.countrySearchCtl.valueChanges.subscribe(() => {
      this.filterCountries(this.countrySearchCtl.value);
    });
  }

  private filterCountries(search?: string) {
    if (search != null && search.length) {
      this.countries = this.allCountries.filter((country: Country) => {
        return country.frName.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      this.countries = Object.assign([], this.allCountries);
    }
  }
}
