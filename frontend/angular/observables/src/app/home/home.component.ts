import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    const customObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
        if (count === 2) {
          observer.complete();
        }
        if(count > 4) {
          observer.error(new Error('Num greater than 4'));
        }
      }, 1000);
    })

    const observablePiped = customObservable.pipe(
      map((data: number) => {
        return data * data;
      }),
      filter(data=> {
        return data % 2 == 0;
      })
    );

    this.subscription = observablePiped.subscribe(count => {
      // data event
      console.log(count);
    }, error => {
      // error event
      console.log(error);
    }, () => {
      // completion event
      console.log("completed")
    })

  }

}
