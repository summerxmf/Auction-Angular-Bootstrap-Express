import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModel: FormGroup;
  categories: string[];
  constructor(fb: FormBuilder, private productServcie: ProductService) {
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
    
   }

  ngOnInit(): void {
    this.categories = this.productServcie.getAllCategories();
    
  }
  onSearch() {
    console.log("click")
    if(this.formModel.valid) {
      console.log(this.formModel.value);
      this.productServcie.searchEvent.emit(this.formModel.value);
    }

  }
  positiveNumberValidator(control: FormControl): any {
    if(!control.value) {
      return null
    }
    let price = control.value;
    if(price > 0) {
      return null;
    }
    return {positveNumber: true}

  }

}
