import { Component, EventEmitter, Input, Output } from '@angular/core';
import {UsersServiceService} from "../users-service.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[] = this.userService.in_active_users;

  constructor(private userService: UsersServiceService) {
  }

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
