
# Router:

## Option - 1 - Defining the routes within the app.module.ts 

1) You need to define a constant, that will be of type "Routes".
2) Give the constant a value of array of {path: "", component: HomeComponent} and this will load the HomeComponent when "" or root path is loaded.
3) Import RouterModule, and then register this constant.
4) Go to your base HTML and define the place where you want the Component to replace as "<router-outlet>"

## Option - 2 - Defining it separately

1) Create a new file, appropriately named

```typescript

appRoutes is a list of routes like this

const appRoutes: Routes = [
    {path: "users", component: UsersComponent, children: [
            {path: ":id/:name", component: UserComponent},
        ]},
    {path: "", component: HomeComponent},
    {path: "servers", component: ServersComponent, children: [
            {path: ":id/edit", component: EditServerComponent},
            {path: ":id", component: ServerComponent},
        ]},
    {path: "**", redirectTo: ""}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

```

# RouterLinks

NOTE: USING href attribute reloads the page which is inefficient, to truly achieve the SPA feel, you must use routerLinks 

RouterLinks parses the current configuration and then provides the appropriate component to load.

# RouterLink - formats

1) routerLink="/servers"

This will always append to the root domain

ex: localhost/api/something --- add hello
---> localhost/hello

2) routerLink="servers"

This will always append to the end of the current segment

ex: localhost/api/something --- add hello
---> localhost/api/something/hello

3) routerLink="../servers"

This will remove the segment and then appends serves

ex: localhost/api/something --- add hello
---> localhost/servers

# RouterLinkActive and RouterLinkOptions

RouterLinkActive is a attribute that you can use to conditionally specify a CSS property to be applied when at a specific route.

for example: navigation nav link highlight 

```angular2html

<li routerLinkActive="active">
    <a>
        route 1
    </a>
</li>

```

RouterLinkOptions is a property binding that only lets the CSS conditional application to happen when the route matches exactly.

prevousily if route had "/segement"
the css condition for "/" would also apply

but once, 
```angular2html

<li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
    <a routerLink="/">Home</a>
</li>

or you could bind routerLink to an array

[routerLink] = "['/users', 10, 'Anna']" --> "/users/10/Anna"

```

Only exact matches will have that css

# Navigating programmatically

```typescript

export class HomeComponent implements OnInit {

    constructor(private router: Router) { } // bind the router class.

    ngOnInit() {
    }

    onLoadServers() {
        // do something complex
        this.router.navigate(["/servers"]) // route to the endpoint you wanna go to.
    }
}

```

## Relative paths:

You can just use 
```typescript

this.router.navigate(["servers"])

```
but its pointless as it always appends to the root domain. 

navigate method also takes in extra parameter 

activeLink is gotten as an object of `ActiveRoute` class that you bind to in the constructor

```typescript

navigate(["servers"], {relativeTo: activeLink})

```

# Passing Parameters and Fetching them:

```typescript

At appRoutes constant:

{
    path: "/:id/:name", component: SomeComponent
}

```

This allows you to grab id and name from the URL. 

NOTE: This data being passed as a router param *snapshot* will not be updated whenever data inside the component changes. This will happen if you load or change user within the component. To prevent this, you can subscribe to an observable. 

NOTE NOTE: All the observables being subscribed to has to be unsubscribed from using onDestroy event. This is not compulsory as angular takes care of it, but you notice a memory leak - you know where to look.

# Passing query parameters:

You can bind with [queryParams] property

```typescript

[queryParams] = "{'allowEdit': 'true'}"

--> ?allowEdit=true

```

# Passing fragments - only one can be passed by design

Fragments are whatever that comes after #

```typescript

[fragments] = "loading"

--> #loading

```

# Passing query Params and fragments programmatically

Using this.router.navigate(['servers', 'edit'], {queryParams: {allowEdit: true}, fragments: "loading"})

# Retrieving query Params and fragments:

You can retrieve them from `ActivatedRoute` and then using snapshot to grab the queryParams and then fragments.

but this will again lead to the data not being updated whenever the User changes them from within the component.

Use observables and then subscribe from within the component to periodically update.

# Nest children

if you have multiple API's that start with the same path like

```typescript

servers/add
servers/delete 
servers/update

```

etc, you can just nest them with the key, `children` in the apiRoutes

```typescript

{path: "servers", component: ServerComponent, children: [
    {path: "add", component: AddServerComponent},
    ...
]}

```

NOTE: There has to be nested `router-outlet` in the parent of each nested children. Here in this case, we need to have one at ServerComponent.

# Passing query param data

```typescript

bind to a template tag using

[queryParams] = {allowEdit: '1'} 

// allowEdit will be sent in the URL like --> ?allowEdit=1
```

access the data by, route which is an object of ActivatedRoute

```typescript

this.route.queryParams.subscribe(
    (queryParams: Params) => {
        // update state
    }
)

```

# Handling query params:

suppose you were here, `\root` and then you add some new query params to this path

`\root?sexy=True` and you want to pass the query params as it is or merge new ones etc to another domain, you define the `queryParamsHandling: "preserve"`

```typescript

    this.router.navigate(["edit"], {relativeTo: this.route, queryParamsHandling: "preserve"})


```

Instead of preserve - which sends query params as it is
you can specify merge etc.

# Redirection - 404!!

in the path constants, add a last item as

```typescript

{path: "**", redirectTo: "\not-found"}

```

The redirect to attribute, redirects the url from all endpoints that was not previously defined to the URL we want to show the logic for it.

the path '**' must be the last one in the app Routes array as it catches all routes that was not previously caught.




# Router Guards:

## Auth Guards

In Angular, guards are special classes used to control and manage access to different parts of an application. They decide whether a user can navigate to a particular route or perform certain actions based on specific conditions, like checking if the user is logged in or has the necessary permissions.

Start off by implementing the `canActivate` interface. This can return a Promise, Observable etc, do the frontend auth logic in the method body and then return if the user can access it or not.

### Only protect child routes

Instead of having to put a guard in every route, you can implement a `canActivateChild` interface that allows to specify if the child routes can be authenticated.

```typescript

{
    path: "servers",
        // canActivate: [AuthGuardService], // this prevents access to this route AND child routes
        canActivateChild: [AuthGuardService], // this AuthGuardService implements logic to protect the child routes
    component: ServersComponent,
    children: [
    {path: ":id/edit", component: EditServerComponent},
    {path: ":id", component: ServerComponent},
]
},

```

## CanDeactivate Guard:

canDeactivate is the opposite, it tells us if we can move out of the given component. 

NOTE: All guards are services.

```typescript

export interface canComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class canDeactivateGuard implements CanDeactivate<canComponentDeactivate>{
    
    // auto-generate this
    canDeactivate(component: canComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        // implement logic to define when to enable the user to move out.
        return component.canDeactivate();
    }
}

```

Start off by defining an interface and then implementing the interface which then defines a method called canDeactivate to ensure if the user can move out of the scope of the component.

# Passing data through routes:

## Static:

```typescript

in your routing module

{path:"not-found/", component: ErrorPageComponent, data: {message: "Not Found"}},

```

Whenever this route is navigated to, the static message data is viable to the ErrorPageComponent

```typescript

export class ErrorPageComponent implements OnInit {

    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.errorMessage = this.route.snapshot.data["message"]
    }

}

```

## dynamic

In order for dynamic data resolution, that is if you had to get/fetch data from the backend before rendering a route, you will have to

1) Define a resolver service - that implements the resolve interface which takes a type (it can be an interface or {})
2) Define the route, with the key name and value as that resolver service.
3) Subscribe to changes in the component Oninit method

```typescript


// server is an interface of type {id: number, name: string}

@Injectable()
export class ServerResolverService implements Resolve<server> {

    constructor(private serverService: ServersService) {
    }
    
    // auto-gen by implementing the Resolve interface in this class
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): server | Observable<server> | Promise<server> {
        // logic to fetch the dynamic data
        return this.serverService.getServer(+route.params["id"])
    }
}

```

In your routes

```typescript

{path: ":id", component: ServerComponent, resolve: {server: ServerResolverService}}

```

In your route component

```typescript

this.route.data.subscribe(
    (data: Data) => {
        // this name as to be same as the key you defined in the route
        this.server = data["server"]
    }
)

```

# Location strategies:

```typescript

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

```

when you set useHash: false, it's using PathLocationStrategy, It's using HTML5 pushstate that requires server support

When you enter the Url to Browser

`localhost:4200/my-base/welcome/`

The server needs to redirect localhost:4200/my-base/welcome/ to your index.html

useHash: true, it's using HashLocationStrategy

you need to add # after your base-href('my-base'), the URL is

`localhost:4200/my-base/#/welcome/`

The server directly makes a request to localhost:4200/my-base/ to your index.html, It's easy to implement in server side.