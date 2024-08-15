import { Injectable } from '@angular/core';
import {CountingServiceService} from "./counting-service.service";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  active_users: string[] = ['Max', 'Anna'];
  in_active_users: string[] = ['Chris', 'Manu'];

  constructor(private countinService: CountingServiceService) { }

  setToInActive(id: number) {

    this.in_active_users.push(this.active_users[id]);
    this.active_users.splice(id, 1);

    this.countinService.incrementActiveToInActive();

    console.log(this.countinService.conversionFromActiveToInActive)

  }

  setToActive(id: number) {

    this.active_users.push(this.in_active_users[id]);
    this.in_active_users.splice(id, 1);

    this.countinService.incrementInActiveToActive();

    console.log(this.countinService.conversionFromInActiveToInActive)

  }

}
