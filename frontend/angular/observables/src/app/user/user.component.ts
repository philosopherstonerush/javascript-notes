import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ActivateService} from "../activate-service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;
  activated: boolean = false;

  constructor(private route: ActivatedRoute, private activatedService: ActivateService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivated() {
    this.activated = !this.activated;
    this.activatedService.sendActivated(this.activated);
  }
}
