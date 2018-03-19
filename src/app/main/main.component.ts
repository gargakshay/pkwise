import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isSubmit = false;
  constructor() { }

  ngOnInit() {
  }

  submit(form) {
      console.log('submit', form);
      this.isSubmit = !this.isSubmit;

      if(!this.isSubmit) {
        alert('Record Saved...!!!')
      }

  }

}
