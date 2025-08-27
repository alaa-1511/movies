import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-spinner',
  imports: [    NgxSpinnerModule ],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent  implements OnInit {

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    /** إظهار اللودر */
    this.spinner.show();

    setTimeout(() => {
      /** إخفاء اللودر بعد 3 ثواني */
      this.spinner.hide();
    }, 3000);
  }
}
