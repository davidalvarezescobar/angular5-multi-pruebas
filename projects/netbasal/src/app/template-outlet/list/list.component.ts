import {
  AfterContentInit, Component, ContentChild, Input, TemplateRef
} from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements AfterContentInit {
  @Input() public dataList: any; // los datos que maneja el componente
  @ContentChild("rows") rowRef: TemplateRef<any>;

  ngAfterContentInit() {
    console.log('list.component:', this.rowRef);
  }
}
