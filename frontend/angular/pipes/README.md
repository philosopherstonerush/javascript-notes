
# Pipes

pipes are simple functions that transform one value to another in the template before displaying it to the user

some built in pipes are:
- DatePipe
- UpperCasePipe
etc

```angular17html

// uppercase is a pipe provided to convert instanceType
{{ server.instanceType | uppercase }}

```

## Sending parameters with pipe

```angular17html

// date pipe has a parameter 'fullDate' and multiple such parameters can be chained
{{ server.started | date:'fullDate':'short' }}

```

## Chaining pipes:

```angular17html

\\ multiple pipes can be chained together

{{ server.started | date:'fullDate' | uppercase }}

\\ output: MONDAY, AUGUST 9, 1920

```

## Custom pipes

```angular17html

@Pipe({
  standalone: true,
  name: 'funny' // specifies the name of the pipe operation like {{ something | funny }} 
})
export class FunnyPipe implements PipeTransform{
    // implement the transform function specified by pipetransform
    // the args can be removed to send other parameters
    transform(value: any, ...args: any[]) {
      return value + " HAHAHA";
    }
}

```

## Adding custom pipes - ng g command

`ng g p <pipe-name>`

## Pipes can be added to for loops:

```typescript

// *ngFor="let server of servers | filter:filterStatus"

...

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value:any, filterString:string): any[] {
    if(value.length == 0) {
      return value;
    }
    const result:any[] = [];
    for(const item of value) {
      if(item['status'] === filterString) {
        result.push(item);
      }
    }
    return result;
  }
}

```

## Gotchas

DO NOT USE PIPE FOR FILTER!!! It will lead to performance issues

## Pure and Impure pipes

A pure pipe is only called when Angular detects a change in the value or the parameters passed to a pipe.

An impure pipe is called for every change detection cycle no matter whether the value or parameter(s) changes.

This is relevant for changes that are not detected by Angular

when you pass an array or object that got the content changed (but is still the same instance)
when the pipe injects a service to get access to other values, Angular doesn't recognize if they have changed.
In these cases you probably still want the pipe to be executed.

You should be aware that impure pipes are prone to be inefficient. For example when an array is passed into the pipe to filter, sort, ... then this work might be done every time change detection runs (which is quite often especially with the default ChangeDetectionStrategy setting) event though the array might not even have changed. Your pipe should try to recognize this and for example return cached results.

## Async pipe

Directly resolve promises/observables in the HTML

```typescript

appStatus = new Promise(resolve => {
    setTimeout(
      () => {
        resolve("online")
    }, 2000
  )
});

```

```angular17html
app status: {{ appStatus | async }}
```
