import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws: WebSocket;

  constructor() { }
  createObservableSocket(url: string, productId: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data); // 接收服务器端send的message
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId}) //onpen客户端连接server时的事件
        return () => this.ws.close();
      }
    ).pipe(
      map(message => JSON.parse(message))
    )
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }

}
