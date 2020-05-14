import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from 'src/app/services/profile.service';
import {environment} from 'src/environments/environment';
import {User, UserRoles} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  private id: Number;
  private user: User = <User> {};
  private age: string;
  private pathProfilePicture: string;
  private pathCoverPicture: string;
  private who: string;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.isLoading = true;
    document.body.style.background = "url('../../../assets/img/connection-background.jpg') no-repeat 0 0";
    document.body.style.backgroundSize = "auto";
    this.who = this.route.snapshot.paramMap.get('who');
    this.getUser();
  }

  ngOnDestroy() {
    document.body.style.backgroundSize = "";
    document.body.style.background = "";
  }

  getUser() {
    this.profileService.getUser(this.who).then((resp: any) => {
      const respObj = <User>resp;
      this.user = respObj;
      this.id = this.user.id;
      if (this.user.birthDay) {
        const birthYear = Number((this.user.birthDay.toString()).substr(0, 4));
        const currentYear = new Date().getFullYear();
        this.age = (currentYear - birthYear) + ' ans';
      } else {
        this.age = '-- ans';
      }
      this.pathCoverPicture = this.user.coverPicture
        ? environment.apiURL + this.user.coverPicture.fullPath
        : '/assets/img/default-cover.png';
      this.pathProfilePicture = this.user.profilePicture
        ? environment.apiURL + this.user.profilePicture.fullPath
        : '/assets/img/default-avatar.png';
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    });
  }

  canUpdate(): boolean {
    return this.who === 'me' || this.accountService.getConnectedUserRole() === UserRoles.ADMIN;
  }
}
