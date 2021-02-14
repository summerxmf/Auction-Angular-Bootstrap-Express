import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.scss']
})
export class ReactiveRegistComponent implements OnInit {
  formRegist: FormGroup;

  constructor() {
    this.formRegist = new FormGroup({
      username: new FormControl(),
      mobile: new FormControl(),
      passwordGroup: new FormGroup({
        password: new FormControl(),
        confirmP: new FormControl()
      })      
    })
   }
  ngOnInit() {
  }
  onSubmit () {
    console.log (this.formRegist.value)
  }

}
