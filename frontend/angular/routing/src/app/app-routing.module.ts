import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./users/user/user.component";
import {HomeComponent} from "./home/home.component";
import {ServersComponent} from "./servers/servers.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {ServerComponent} from "./servers/server/server.component";
import {AuthGuardService} from "./auth-guard.service";
import {canDeactivateGuard} from "./servers/edit-server/can-deactivate-guard.service";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ServerResolverService} from "./servers/server/server-resolver.service";
import {forkJoin} from "rxjs";

const appRoutes: Routes = [
    {path: "users", component: UsersComponent, children: [
            {path: ":id/:name", component: UserComponent},
        ]},
    {path: "", component: HomeComponent},
    {
        path: "servers",
        // canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        component: ServersComponent,
        children: [
            {path: ":id/edit", component: EditServerComponent, canDeactivate: [canDeactivateGuard]},
            {path: ":id", component: ServerComponent, resolve: {server: ServerResolverService}},
        ]
    },
    {path:"not-found/", component: ErrorPageComponent, data: {message: "Not Found"}},
    {path: "**", redirectTo: 'not-found/'}
]

@NgModule({
    imports: [
        // pathLocationStrategy
        RouterModule.forRoot(appRoutes)
        // hashLocationStrategy
        // RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}