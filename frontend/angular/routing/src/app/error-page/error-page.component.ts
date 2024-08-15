import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../AuthService";

@Component({
    selector: 'app-error',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.errorMessage = this.route.snapshot.data["message"]
    }

}