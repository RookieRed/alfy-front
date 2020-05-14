import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-profile-picture-element',
  templateUrl: './profile-picture-element.component.html',
  styleUrls: ['./profile-picture-element.component.scss']
})
export class ProfilePictureElementComponent implements OnInit, OnChanges {
  @Input("src")
  public profilePictureSrc: string;
  @Input("loading")
  public pictureIsLoading = false;
  public pictureIsWide = false;
  public readonly imgElementId = "profile-picture" + ("" + Math.random()).substr(0, 4);

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pictureIsLoading !== undefined
      && (!changes.pictureIsLoading.previousValue && changes.pictureIsLoading.currentValue)) {
      this.setLoadingPicture();
    }
  }

  setLoadingPicture() {
    this.pictureIsLoading = true;
    const pictureElem = <HTMLImageElement>document.getElementById(this.imgElementId);
    if (pictureElem != null) {
      pictureElem.onload = () => {
        this.pictureIsWide = pictureElem.naturalWidth / pictureElem.naturalHeight < 1;
        this.pictureIsLoading = false;
      };
    } else {
      this.pictureIsLoading = false;
    }
  }

}
