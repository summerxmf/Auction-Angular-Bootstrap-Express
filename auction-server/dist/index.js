'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
exports.__esModule = true;
exports.Comment = exports.Product = void 0;
var express = require('express');
var ws_1 = require('ws');
var app = express();
var Product = /** @class */ (function () {
  function Product(id, title, price, rating, desc, url, categories) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.desc = desc;
    this.url = url;
    this.categories = categories;
  }
  return Product;
})();
exports.Product = Product;
var Comment = /** @class */ (function () {
  function Comment(id, productId, timestamp, user, rating, content) {
    this.id = id;
    this.productId = productId;
    this.timestamp = timestamp;
    this.user = user;
    this.rating = rating;
    this.content = content;
  }
  return Comment;
})();
exports.Comment = Comment;
var products = [
  new Product(
    1,
    'Huawei 8',
    1999,
    4,
    'This is my first cell phone',
    'http://placehold.it/320x150',
    ['electronics', 'mobile']
  ),
  new Product(
    2,
    'vivo x9s',
    2999,
    2.5,
    'This is my second cell phone',
    'http://placehold.it/320x150',
    ['mobile', 'hardware']
  ),
  new Product(
    3,
    'Oppo note6',
    3999,
    4.5,
    'This is my Third cell phone',
    'http://placehold.it/320x150',
    ['electronics']
  ),
  new Product(
    4,
    'Iphone 8',
    1899,
    3.5,
    'This is my fourth cell phone',
    'http://placehold.it/320x150',
    ['electronics', 'mobile']
  ),
  new Product(
    5,
    'Xiaomi4X',
    5999,
    3,
    'This is my fifth cell phone',
    'http://placehold.it/320x150',
    ['hardware']
  ),
  new Product(
    6,
    'Sumsung S8',
    3899,
    2.5,
    'This is my sixth cell phone',
    'http://placehold.it/320x150',
    ['electronics']
  )
];
var comments = [
  new Comment(
    1,
    1,
    '2017-02-02 20:19:20',
    'Tom',
    3,
    'good communication and service, will buy from this seller again'
  ),
  new Comment(2, 1, '2017-03-12 23:59:20', 'Shayan', 3, 'as describe'),
  new Comment(
    3,
    1,
    '2017-03-18 12:20:56',
    'Ryan',
    3,
    'good quality, recommend'
  ),
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
app.get('/api', function (req, res) {
  res.send('Hello Express');
});
app.get('/api/products', function (req, res) {
  var result = products;
  var params = req.query;
  if (params.title) {
    result = result.filter(function (p) {
      return p.title.indexOf(params.title) !== -1;
    });
  }
  if (params.price && result.length > 0) {
    result = result.filter(function (p) {
      return p.price <= parseInt(params.price);
    });
  }
  if (params.price && params.category != '-1' && result.length > 0) {
    result = result.filter(function (p) {
      return p.categories.indexOf(params.category) !== -1;
    });
  }
  res.json(result);
});
app.get('/api/product/:id', function (req, res) {
  res.json(
    products.find(function (product) {
      return product.id == req.params.id;
    })
  );
});
app.get('/api/product/:id/comments', function (req, res) {
  res.json(
    comments.filter(function (comment) {
      return comment.productId == req.params.id;
    })
  );
});
// const server = http.createServer(app);
// server.listen(8000, 'localhost', ()=>{
//   console.log("Server is listening on 8000")
// })
var server = app.listen(8000, 'localhost', function () {
  console.log('Server is listening on lddddddll 8000');
});
var subscriptions = new Map();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', function (websocket) {
  websocket.send('This is a notification from server');
  websocket.on('message', function (message) {
    console.log('Received message： ' + message);
    var messageObj = JSON.parse(message);
    var productIds = subscriptions.get(websocket) || [];
    subscriptions.set(
      websocket,
      __spreadArrays(productIds, [messageObj.productId])
    );
  });
});
var currentBids = new Map();
setInterval(function () {
  products.forEach(function (p) {
    var currentBid = currentBids.get(p.id) || p.price;
    var newBid = currentBid + 5 * Math.random();
    currentBids.set(p.id, newBid);
  });
  subscriptions.forEach(function (productIds, ws) {
    if (ws.readyState === 1) {
      var newBids = productIds.map(function (pid) {
        return {
          productId: pid,
          bid: currentBids.get(pid)
        };
      });
      ws.send(JSON.stringify(newBids));
    }
  });
  // if(wsServer.clients) {
  //   wsServer.clients.forEach(client => {
  //     client.send('push data from server')
  //   })
  // }
}, 2000);
