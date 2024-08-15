import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountingServiceService {

  conversionFromActiveToInActive: number = 0;
  conversionFromInActiveToInActive: number = 0;

  constructor() { }

  incrementActiveToInActive() {
    this.conversionFromActiveToInActive++;
  }

  incrementInActiveToActive() {
    this.conversionFromInActiveToInActive++;
  }

}
