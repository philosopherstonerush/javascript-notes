import {LoggingService} from "./Logging.service";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class AccountsService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    statusUpdated: EventEmitter<String> = new EventEmitter();

    constructor(private loggingService: LoggingService) {
    }

    addAccount(name: string, status: string) {
        this.accounts.push({name: name, status: status});
        this.loggingService.loggingStatusChanged(name + status)
    }

    updateStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.loggingStatusChanged(id + status)
    }
}