import * as express from 'express';
import {Server} from 'ws';

const app = express();

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

 let products: Product[] = [
  new Product(1, 'Huawei 8', 1999, 4, 'This is my first cell phone','http://placehold.it/320x150', ['electronics', 'mobile']),
  new Product(2, 'vivo x9s', 2999, 2.5, 'This is my second cell phone', 'http://placehold.it/320x150', ['mobile','hardware']),
  new Product(3, 'Oppo note6', 3999, 4.5, 'This is my Third cell phone', 'http://placehold.it/320x150', ['electronics']),
  new Product(4, 'Iphone 8', 1899, 3.5, 'This is my fourth cell phone', 'http://placehold.it/320x150', ['electronics', 'mobile']),
  new Product(5, 'Xiaomi4X', 5999, 3, 'This is my fifth cell phone', 'http://placehold.it/320x150', ['hardware']),
  new Product(6, 'Sumsung S8', 3899, 2.5, 'This is my sixth cell phone', 'http://placehold.it/320x150', ['electronics'])
]

let comments: Comment [] = [
  new Comment(1, 1, '2017-02-02 20:19:20', 'Tom', 3, 'good communication and service, will buy from this seller again'),
  new Comment(2, 1, '2017-03-12 23:59:20', 'Shayan', 3, 'as describe'),
  new Comment(3, 1, '2017-03-18 12:20:56', 'Ryan', 3, 'good quality, recommend'),
  new Comment(4, 2, '2017-04-22 18:39:20', 'Evan', 3, 'nice seller, nice good'),
  new Comment(5, 3, '2017-02-02 20:19:20', 'Molly', 3, 'better than expected'),
  new Comment(6, 4, '2017-03-12 23:59:20', 'Shayan', 3, 'as describe'),
  new Comment(7, 5, '2017-03-18 12:20:56', 'Ryan', 3, 'not bad, recommend'),
  new Comment(8, 5, '2017-04-22 18:39:20', 'Evan', 3, 'very nice'),
  new Comment(9, 6, '2017-02-02 20:19:20', 'Molly', 3, 'nice'),
  new Comment(10, 6, '2017-03-12 23:59:20', 'Tom', 3, 'not bad'),
  new Comment(11, 5, '2017-03-18 12:20:56', 'Ryan', 3, 'nice, recommend'),
  new Comment(12, 4, '2017-04-22 18:39:20', 'Evan', 3, 'very good')
];

app.get('/api',(req, res) =>{
  res.send('Hello Express')
})

app.get('/api/products', (req, res)=>{
  let result = products;
  let params = req.query;
  if(params.title) {
    result = result.filter((p)=> p.title.indexOf(params.title) !== -1)
  }
  if(params.price && result.length > 0) {
    result = result.filter((p) => p.price <= parseInt(params.price))
  }
  if(params.price && params.category!='-1'&& result.length > 0) {
    result = result.filter((p) => p.categories.indexOf(params.category)!== -1)
  }
  res.json(result);  
})

app.get('/api/product/:id', (req, res)=>{
  res.json(products.find((product)=>(product.id == req.params.id)))
})

app.get('/api/product/:id/comments', (req, res)=>{
  res.json(comments.filter((comment)=>(comment.productId == req.params.id)))
})

// const server = http.createServer(app);
// server.listen(8000, 'localhost', ()=>{
//   console.log("Server is listening on 8000")
// })
const server = app.listen(8000, 'localhost', ()=>{
    console.log("Server is listening on lddddddll 8000")
  })

const subscriptions = new Map<any, number[]> ();

const wsServer = new Server({port: 8085});
wsServer.on('connection', websocket =>{
  websocket.send("This is a notification from server");
  websocket.on("message", message =>{
    console.log("Received message： " + message)
    let messageObj = JSON.parse(message);
    let productIds = subscriptions.get(websocket) || [];    
    subscriptions.set(websocket, [...productIds, messageObj.productId]);    
  })
})

const currentBids = new Map<number, number>();
  setInterval(() => {
    products.forEach(p=> {
      let currentBid = currentBids.get(p.id) || p.price;      
      let newBid = currentBid + 5*Math.random()
      currentBids.set(p.id, newBid); 
    })

    subscriptions.forEach((productIds: number[], ws) => {
      if(ws.readyState === 1) {
        let newBids = productIds.map(pid => ({
          productId: pid,
          bid: currentBids.get(pid)
        }));
        ws.send(JSON.stringify(newBids))
      }      
    })

    // if(wsServer.clients) {
    //   wsServer.clients.forEach(client => {
    //     client.send('push data from server')
    //   })
    // }
  }, 2000)
  

































