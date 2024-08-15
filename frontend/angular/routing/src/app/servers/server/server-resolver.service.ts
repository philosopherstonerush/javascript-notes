import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ServersService} from "../servers.service";
import {Injectable} from "@angular/core";


interface server {
    id: number,
    name: string,
    status: string
}

@Injectable()
export class ServerResolverService implements Resolve<server> {

    constructor(private serverService: ServersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): server | Observable<server> | Promise<server> {
        return this.serverService.getServer(+route.params["id"])
    }
}