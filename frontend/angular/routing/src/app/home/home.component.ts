import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private activeLink: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
  }

  onLoadServers() {
    // do something complex
    // this.router.navigate(["/servers"])

    this.router.navigate(["servers"], {relativeTo: this.activeLink})
  }

  onLogin() {
    this.auth.login();
  }

  onLogout() {
    this.auth.logout();
  }
}
