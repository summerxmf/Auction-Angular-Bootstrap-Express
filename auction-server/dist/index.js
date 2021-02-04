'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Comment = exports.Product = void 0;
const express = require('express');
const ws_1 = require('ws');
const app = express();
class Product {
  constructor(id, title, price, rating, desc, url, categories) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.desc = desc;
    this.url = url;
    this.categories = categories;
  }
}
exports.Product = Product;
class Comment {
  constructor(id, productId, timestamp, user, rating, content) {
    this.id = id;
    this.productId = productId;
    this.timestamp = timestamp;
    this.user = user;
    this.rating = rating;
    this.content = content;
  }
}
exports.Comment = Comment;
let products = [
  new Product(
    1,
    'Huawei 8',
    1999,
    4,
    'This is my first cell phone, and it was created when I do my Angular project.',
    'http://placehold.it/320x150',
    ['electronics', 'mobile']
  ),
  new Product(
    2,
    'vivo x9s',
    2999,
    2.5,
    'This is my second cell phone, and it was created when I do my Angular project.',
    'http://placehold.it/320x150',
    ['mobile', 'hardware']
  ),
  new Product(
    3,
    'Oppo note6',
    3999,
    4.5,
    'This is my third cell phone, and it was created when I do my Angular project.',
    'http://placehold.it/320x150',
    ['electronics']
  ),
  new Product(
    4,
    'Iphone 8',
    1899,
    3.5,
    'This is my fourth cell phone, and it was created when I do my Angular project.',
    'http://placehold.it/320x150',
    ['electronics', 'mobile']
  ),
  new Product(
    5,
    'Xiaomi4X',
    5999,
    3,
    'This is my fifth cell phone, and it was created when I do my Angular project.',
    'http://placehold.it/320x150',
    ['hardware']
  ),
  new Product(
    6,
    'Sumsung S8',
    3899,
    2.5,
    'This is my six cell phone, and it was created when I do my Angular project.',
    'http://placehold.it/320x150',
    ['electronics']
  )
];
let comments = [
  new Comment(1, 1, '2017-02-02 20:19:20', 'Tom', 3, 'Not bad'),
  new Comment(2, 1, '2017-03-12 23:59:20', 'Shayan', 3, 'Not bad'),
  new Comment(
    3,
    1,
    '2017-03-18 12:20:56',
    'Ryan',
    4,
    'Good product，highly recommend'
  ),
  new Comment(4, 2, '2017-04-22 18:39:20', 'Evan', 3, 'Nice product'),
  new Comment(
    5,
    3,
    '2017-02-02 20:19:20',
    'Molly',
    3,
    'Fantastic function, the camera is very god'
  ),
  new Comment(
    6,
    4,
    '2017-03-12 23:59:20',
    'Shayan',
    3,
    'Nice customer service'
  ),
  new Comment(
    7,
    5,
    '2017-03-18 12:20:56',
    'Ryan',
    3,
    'Good product，highly recommend'
  ),
  new Comment(8, 5, '2017-04-22 18:39:20', 'Evan', 3, 'very good'),
  new Comment(9, 6, '2017-02-02 20:19:20', 'Molly', 3, 'very good'),
  new Comment(10, 6, '2017-03-12 23:59:20', 'Tom', 3, 'Not bad'),
  new Comment(
    11,
    5,
    '2017-03-18 12:20:56',
    'Ryan',
    3,
    'Good product，highly recommend'
  ),
  new Comment(12, 4, '2017-04-22 18:39:20', 'Evan', 3, 'Intesting')
];
app.get('/api', (req, res) => {
  res.send('Hello Express');
});
app.get('/api/products', (req, res) => {
  let result = products;
  let params = req.query;
  if (params.title) {
    result = result.filter((p) => p.title.indexOf(params.title) !== -1);
  }
  if (params.price && result.length > 0) {
    result = result.filter((p) => p.price <= parseInt(params.price));
  }
  if (params.price && params.category != '-1' && result.length > 0) {
    result = result.filter((p) => p.categories.indexOf(params.category) !== -1);
  }
  res.json(result);
});
app.get('/api/product/:id', (req, res) => {
  res.json(products.find((product) => product.id == req.params.id));
});
app.get('/api/product/:id/comments', (req, res) => {
  res.json(comments.filter((comment) => comment.productId == req.params.id));
});
// const server = http.createServer(app);
// server.listen(8000, 'localhost', ()=>{
//   console.log("Server is listening on 8000")
// })
const server = app.listen(8000, 'localhost', () => {
  console.log('Server is listening on lddddddll 8000');
});
const subscriptions = new Map();
const wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', (websocket) => {
  websocket.send('This is a news from server');
  websocket.on('message', (message) => {
    console.log('Received message： ' + message);
    let messageObj = JSON.parse(message);
    let productIds = subscriptions.get(websocket) || [];
    subscriptions.set(websocket, [...productIds, messageObj.productId]);
  });
});
const currentBids = new Map();
setInterval(() => {
  products.forEach((p) => {
    let currentBid = currentBids.get(p.id) || p.price;
    let newBid = currentBid + 5 * Math.random();
    currentBids.set(p.id, newBid);
  });
  subscriptions.forEach((productIds, ws) => {
    if (ws.readyState === 1) {
      let newBids = productIds.map((pid) => ({
        productId: pid,
        bid: currentBids.get(pid)
      }));
      ws.send(JSON.stringify(newBids));
    }
  });
  // if(wsServer.clients) {
  //   wsServer.clients.forEach(client => {
  //     client.send('这是定时推送')
  //   })
  // }
}, 2000);
//# sourceMappingURL=index.js.map
