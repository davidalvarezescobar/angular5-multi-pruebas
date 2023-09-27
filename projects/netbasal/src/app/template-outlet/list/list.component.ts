import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  AfterContentInit,
} from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, AfterContentInit {
  @Input() public dataList: any; // los datos que maneja el componente
  @ContentChild("rows") rowRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    console.log(this.rowRef);
  }
}
