import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductService } from '../shared/product.service';
import {debounceTime} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]> ;
  // keyword: string;
  // titleFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) { 
    // this.titleFilter.valueChanges.pipe(
    //   debounceTime(200)
    // )
    // .subscribe(
    //   value => this.keyword = value
    // )
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.productService.searchEvent.subscribe(
      params=> this.products = this.productService.search(params)
    )
  }

}


