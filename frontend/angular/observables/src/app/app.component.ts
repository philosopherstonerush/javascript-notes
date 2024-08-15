import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivateService} from "./activate-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean = false;
  activatedServiceSubscription: Subscription;

  constructor(private activatedService: ActivateService) {}

  ngOnDestroy(): void {
    this.activatedServiceSubscription.unsubscribe();
  }

  ngOnInit() {

    this.activatedServiceSubscription = this.activatedService.activatedEmitter.subscribe(b => {
      this.activated = b;
    })

  }
}
