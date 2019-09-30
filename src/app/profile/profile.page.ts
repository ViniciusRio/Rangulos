import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile;
  constructor() {
    this.profile = {
      name: "Vinicius Rio",
      email: "viniciustrave@gmail.com",
      urlPhoto: 'https://picsum.photos/200/300'
    };
  }
  ngOnInit() {
  }

}
