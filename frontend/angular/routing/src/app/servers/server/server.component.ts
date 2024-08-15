import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {ServerResolverService} from "./server-resolver.service";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router, private resolver: ServerResolverService
  ) { }

  ngOnInit() {
    // this.server = this.serversService.getServer(parseInt(this.route.snapshot.params["id"]));
    // this.route.params.subscribe((params) => {
    //   this.server = this.serversService.getServer(parseInt(params['id']));
    // })

    this.route.data.subscribe(
        (data: Data) => {
          this.server = data["server"]
        }
    )

  }

  onEdit() {

    // Both of these do the same thing!

    // this.router.navigate(["/servers", this.server.id, "edit"])
    this.router.navigate(["edit"], {relativeTo: this.route, queryParamsHandling: "preserve"})
  }
}
