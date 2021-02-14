import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product,Comment, ProductService } from '../shared/product.service';
import { Observable, Subscription } from 'rxjs';
import { WebSocketService } from '../shared/web-socket.service';

@Component({
  selector: 'app-productDetail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.scss']
})
export class ProductDetailComponent implements OnInit {  
  product: Product;
  comments: Comment[];
  newRating: number = 5;
  newComment: string= '';
  isWatched:boolean = false;
  currentBid: number;
  subscription: Subscription;

  isCommentHidden: boolean = true;
  constructor(private routeInfo: ActivatedRoute, 
              private productService: ProductService, 
              private wsService: WebSocketService
              ) {}

  ngOnInit() {
    let productId = this.routeInfo.snapshot.params['prodId'];
    
    this.productService.getProduct(productId).subscribe(
      (product) => {
        this.product = product;
        this.currentBid = product.price;        
      }
      
    );
    
    this.productService.getCommentsByProductId(productId).subscribe(
      comments => this.comments = comments      
    );
    
  }
  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toLocaleString(), 'Molly', this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce((sum, comment)=> sum+ comment.rating, 0 );
    this.product.rating = sum / this.comments.length;

    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

  watchProduct() {
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false
      this.subscription = null;
      return;
    }
    this.isWatched = true;
    this.subscription = this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
      .subscribe(        
        products => { 
          console.log(products)  
         let product = products.find(p => p.productId == this.product.id)
          this.currentBid = product.bid;
        }
      );
  }

}
