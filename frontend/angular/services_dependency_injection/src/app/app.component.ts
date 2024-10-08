import {Component, OnInit} from '@angular/core';
import {LoggingService} from "./services/Logging.service";
import {AccountsService} from "./services/Accounts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent implements OnInit {
  accounts : {name: string, status: string}[] = [];

  constructor(private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }

}
