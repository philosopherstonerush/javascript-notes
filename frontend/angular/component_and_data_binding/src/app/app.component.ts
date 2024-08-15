import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [
    {
      type: "server",
      name: "my ass",
      content: "your ass"
    }
  ];

  onServerAdded(serverData: {name: string, content: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.name,
      content: serverData.content
    });
  }

  onBlueprintAdded(blueprintDate: {name: string, content: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintDate.name,
      content: blueprintDate.content
    });
  }


}
