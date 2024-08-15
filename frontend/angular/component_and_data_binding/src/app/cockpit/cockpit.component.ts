import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {

  @Output('serverCreatedEvent') serverCreatedEvent = new EventEmitter<{name: string, content: string}>();
  @Output('blueprintCreatedEvent') blueprintCreatedEvent = new EventEmitter<{name: string, content: string}>();

  newServerName = '';
  newServerContent = '';

  @ViewChild('ServerContentElement') serverElementRef: ElementRef;

  onAddServer() {
    this.serverCreatedEvent.emit(
      {
        name: this.newServerName,
        content: this.newServerContent
      }
    )
  }

  onAddBlueprint() {
    this.blueprintCreatedEvent.emit(
      {
        name: this.newServerName,
        content: this.newServerContent
      }
    )
  }

  onAddServerLocal(event: HTMLInputElement) {
    this.serverCreatedEvent.emit(
      {
        name: event.value,
        content: event.value // just repeating here
      }
    )
  }

  onAddServerViewChild() {
    this.serverCreatedEvent.emit(
      {
        name: this.serverElementRef.nativeElement.value,
        content: this.serverElementRef.nativeElement.value // just repeating here
      }
    )
  }
}
