import { Component } from '@angular/core';
import {LoggingService} from "../services/Logging.service";
import {AccountsService} from "../services/Accounts.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService, private accountService: AccountsService) {
    accountService.statusUpdated.subscribe(status => alert(status))
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
  }
}
