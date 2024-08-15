import { Component, EventEmitter, Input, Output } from '@angular/core';
import {UsersServiceService} from "../users-service.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  users: string[] =  this.userService.active_users;

  constructor(private userService: UsersServiceService) {
  }

  onSetToInactive(id: number) {
    this.userService.setToInActive(id)
  }
}
