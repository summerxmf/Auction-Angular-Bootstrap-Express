import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import { ReactiveRegistComponent } from './reactive-regist/reactive-regist.component';
import { WebSocketService } from './shared/web-socket.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:prodId',
    component: ProductDetailComponent
  }
]
@NgModule({
  declarations: [			
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
      ProductDetailComponent,
      HomeComponent,
      FilterPipe,
      ReactiveRegistComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
   
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
