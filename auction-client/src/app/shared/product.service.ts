import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private products: Product[] = [
  //   new Product(1, 'Huawei 8', 1999, 4, '这是第一部手机，是我在学习Angular入门实战时创建的','http://placehold.it/320x150', ['electronics', 'mobile']),
  //   new Product(2, 'vivo x9s', 2999, 2.5, '这是第二部手机，是我在学习Angular入门实战时创建的', 'http://placehold.it/320x150', ['mobile','hardware']),
  //   new Product(3, 'Oppo note6', 3999, 4.5, '这是第三部手机，是我在学习Angular入门实战时创建的', 'http://placehold.it/320x150', ['electronics']),
  //   new Product(4, 'Iphone 8', 1899, 3.5, '这是第四部手机，是我在学习Angular入门实战时创建的', 'http://placehold.it/320x150', ['electronics', 'mobile']),
  //   new Product(5, 'Xiaomi4X', 5999, 3, '这是第五部手机，是我在学习Angular入门实战时创建的', 'http://placehold.it/320x150', ['hardware']),
  //   new Product(6, 'Sumsung S8', 3899, 2.5, '这是第六部手机，是我在学习Angular入门实战时创建的', 'http://placehold.it/320x150', ['electronics'])
  // ]

  // private comments: Comment [] = [
  //   new Comment(1, 1, '2017-02-02 20:19:20', 'Tom', 3, '东西非常好'),
  //   new Comment(2, 1, '2017-03-12 23:59:20', 'Shayan', 3, '东西还不错'),
  //   new Comment(3, 1, '2017-03-18 12:20:56', 'Ryan', 3, '东西不错，值得购买'),
  //   new Comment(4, 2, '2017-04-22 18:39:20', 'Evan', 3, '东西非常好'),
  //   new Comment(5, 3, '2017-02-02 20:19:20', 'Molly', 3, '东西非常好'),
  //   new Comment(6, 4, '2017-03-12 23:59:20', 'Shayan', 3, '东西还不错'),
  //   new Comment(7, 5, '2017-03-18 12:20:56', 'Ryan', 3, '东西不错，值得购买'),
  //   new Comment(8, 5, '2017-04-22 18:39:20', 'Evan', 3, '东西非常好'),
  //   new Comment(9, 6, '2017-02-02 20:19:20', 'Molly', 3, '东西非常好'),
  //   new Comment(10, 6, '2017-03-12 23:59:20', 'Tom', 3, '东西还不错'),
  //   new Comment(11, 5, '2017-03-18 12:20:56', 'Ryan', 3, '东西不错，值得购买'),
  //   new Comment(12, 4, '2017-04-22 18:39:20', 'Evan', 3, '东西非常好')
  // ];

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get('/api/products');
  }
  getProduct(id: number):Observable<any> {
    return this.http.get('/api/product/'+id);
  }
  getCommentsByProductId(id: number): Observable<any> {
    return this.http.get(`/api/product/${id}/comments`)
  }
  getAllCategories(): string[] {
    return ['electronics', 'mobile', 'hardware'];
  }
  search(params: ProductSearchParams): Observable<any> {   
    return this.http.get('/api/products',{params: this.encodeHttpParams(params)})    
  }
  private encodeHttpParams(params){
    let result:HttpParams = new HttpParams(); 
     
    Object.keys(params)
        .filter(key => params[key])
        // .reduce((sum, key)=>{
        //   sum=sum.append(key, params[key]);
        //   return sum;
        // }, new HttpParams())
        .forEach(key=> result = result.append(key, params[key])) 
      
    return result;
  }
 
}

export class ProductSearchParams {
  constructor( public title: string,
               public price: number,
               public category: string
    ){}
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public url: string,
    public categories: Array<string>){}   
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ){}
}