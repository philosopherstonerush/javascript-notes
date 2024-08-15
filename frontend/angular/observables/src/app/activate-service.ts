import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  activatedEmitter: Subject<boolean>;

  constructor() {
    this.activatedEmitter = new Subject<boolean>();
  }

  sendActivated(b: boolean) {
    this.activatedEmitter.next(b);
  }

}
