"use strict";
//모듈
const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require('cors');
dotenv.config();

const { auth } = require("./src/middleware/auth");
const { User } = require("./src/models/User");
const { Cart } = require("./src/models/Cart");
const { Inventory } = require("./src/models/Inventory");
const { PrevOrder } = require("./src/models/PrevOrder");
const mongoose = require("mongoose");




const PORT = 8000;
//라우팅
// const home = require("./src/routes/home");ㄱ
// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host : "practice-2.cmqzoesjtyym.ap-northeast-2.rds.amazonaws.com",
//     user : "yoon",
//     password : "lky271600", 
//     database : "new_schema"
// });
// db.connect();
const db = require('./src/config/db.js'); // db 불러오기 (mongoose)
const { json } = require('body-parser');
db();

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended: true}));



// app.use(express.static(`${__dirname}/prototype_01/build`));// 얘 추후 변경??
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("Hello World!");
});
//회원가입
app.post("/register", (req, res) => {
  
  const user = new User(req.body);
  // console.log(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인
app.post("/login", (req, res) => {
  //1. 요청된 이메일이 데이터베이스에 있는 지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });
    }

    //2. 1조건 충족 시, 비번 맞는 지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      //3. 2조건 충족 시, 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장한다. where? 쿠키 OR 로컬 스토리지 OR 세션스토리지
        //쿠키 name : value
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//Authentication 자격 (관리자화면, 비회원화면)
//auth는 미들웨어
app.get("/auth", auth, (req, res) => {
  //여기까지 오면 미들웨어를 통과했다는 거임
  //그렇다면 Auth가 True라는 뜻
  res.status(200).json({
    _id: req.user._id,
    // 0> 일반 유저 ^ 나머지 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//LogOut
app.post("/logout", (req, res) => {
  
  if(req.body.email !== "void")
  {
    User.findOneAndUpdate({ _id: req.body._id }, { token  : "" }, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    });
  }

});

//장바구니 추가 
app.post("/menu", (req, res) => {
  
  // console.log(req.body);

  var cart = new Cart(req.body);
  
  
  cart.save();

  User.findOne( {  role: { $ne: "77" } })
    .exec()// returns promise
    .then(theUser => {
      let myname = theUser.email;
      console.log(myname);
      // let myaddress = theUser.address;
      return Cart.findOneAndUpdate( {_id : cart._id } , {email: myname});
      })
    .then(updated => {
      //user updated
    })
    .catch(err => {
      console.log(err);
    });

    
    res.status(200).send({ success: true });
});

//장바구니 수정하기 
app.post("/cancelcart",  async (req, res) => {
  
  let newcart = req.body;
  let idarr = [];
  for(let item of newcart)
  {
    let a = new mongoose.Types.ObjectId(item._id);
    idarr.push(a);
  }
  console.log(idarr);
  await Cart.findOneAndDelete( { _id : { $nin : idarr}} );
  
  res.status(200).send({ success: true });
});


// 장바구니 보여주기
app.get("/cart",  (req, res) => {

  
  User.findOne( { token: { $ne: "" }, role: { $ne: 77 } })
  .exec()
  .then(theUser => {
    let myname = theUser.email;
    return Cart.find({ email: myname });
  })
  .then(cart => {
    res.json(cart);
  });

});


//이전 주문목록에 추가 = 주문하기
app.post("/cart", async (req, res) => {
  
    await PrevOrder.create( req.body ,(err) => {
      if (err) return res.json({ success: false, err });
  
      return res.status(200).json({
        success: true,
      });
    });
    

    Cart.remove({}, (err, kitties) => {
      if(err) return res.json(err);
    });
  // const findUser  = await User.findOne( { token: { $ne: null } });
    
  // // const findUser = async() => {
  // //   const myuser = await User.findOne( { token: { $ne: null } });
  // //   return myuser;
  // // }
  // Cart.find({ name: findUser.name })
  // .exec()
  // .then((theUser) => {
  //   console.log(theUser);
  //   const prevorders = new PrevOrder(theUser);
  //   prevorders.save();
  // })

  // res.status(200).send({ success: true });

  // const findCart =  await Cart.find({ name: findUser.name });
  
  // console.log(findCart);
  // var prevorder2 = new PrevOrder(findCart);
  // prevorder2.save();

  

  

  
  // savePrev(b);
  // User.findOne( { token: { $ne: null } })
  // .exec()
  // .then(theUser => {
  //   let myname = theUser.name;
  //   return Cart.find({ name: myname });
  // })
  // .then(a => {
  //   mycart = a;
  // })
  
  // mycart.exec()
  // .then(user =>{
  //   let prevorder2 = new PrevOrder(user);
  //   prevorder2.save();
  //   return prevorder2;
  // })
  // .then(updated => {
  //   //user updated
  // })
  // .catch(err => {
  //   console.log(err);
  // });
  
});

//주문하기 + 재고 변경
app.post("/cartnew", async (req, res) => {
  
  await PrevOrder.create( req.body ,(err) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      success: true,
    });
  });


  const filter =  "637a0fb86f95953a1c09b161";
  for(let item of req.body)
  {
    let update = {};
    let number = item.num;

    if(item.dinnerMenu === "발렌타인 디너")
    {
       update = {$inc : {wine : -1 , steak : -1}};
    }
    else if(item.dinnerMenu === "프렌치 디너")
    {
       update = {$inc : {coffee : -1, wine : -1, salad : -1, steak : -1 }};
    }
    else if(item.dinnerMenu === "잉글리시 디너")
    {
       update = {$inc : {egg : -1, bacon : -1, bread : -1, steak : -1  }};
    }
    else
    {
       update = {$inc : {shamp : -2, baguette : -4, coffee : -2, wine : -2, steak : -2 }};
    }  


    for(var i = 1; i< number + 1; i++)
    {
      Inventory.findByIdAndUpdate(filter, update, (err, user) => {
        if (err) return res.json({ success: false, err });
        return ({ success: true });
      });
    }
    if( (item.coffee !== 0) || (item.bread !== 0) || (item.steak !== 0))
    {
        update = {$inc : {coffee : -(item.coffee) , steak : -(item.steak), bread: -(item.bread)}};
        Inventory.findByIdAndUpdate(filter, update, (err, user) => {
          if (err) return res.json({ success: false, err });
          return ({ success: true });
        });
    }
  }
  //이전 결제 구매 횟수가 3보다 크면 vip
  var isVIP= 0;
  await User.findOne( { token: { $ne: "" }, role: 0 })
    .exec()
    .then(theUser => {
      let myname = theUser.email;
      return PrevOrder.find({ email: myname });
    })
    .then(prev => {
      var size = 0;
      for (var i of prev) 
      {            
        size++;           
      }
      console.log(size);
      if(size > 3)
      {
        isVIP = 1;
      }
    });
  console.log(isVIP);
  if( isVIP === 1)
  {
   await User.findOneAndUpdate( { token: { $ne: "" }, role: 0 }, {isVip : "VIP"}); 
  }

  Cart.deleteMany({}, (err, kitties) => {
    if(err) return res.json(err);
  });
});

// 고객정보 보여주기
app.get("/customerinfo",  (req, res) => {
  User.find( { token: { $ne: "" } } )
  .exec()
  .then(theUser => {
    if(theUser.length !== 1)
    {
      theUser = theUser[1];// void계정이 가장 먼저 만들어져서 무조건 회원정보가 다음 배열에 들어간다.
    }
    else
    {
      theUser = theUser[0];
    }
    let myname = theUser.email;
    return User.find({ email: myname });
  })
  .then(user => {
    res.json(user);
  })


//   User.findOne( { token: { $ne: null } }, (err,user) =>{
//     if (!user) {
//       return res.json({
//         Success: false,
//         message: "해당하는 유저가 없습니다.",
//       });
//     }
//     res.json(user);
//   });
// });
});

// 고객정보 보여주기
app.get("/allcustomerinfo",  (req, res) => {

  User.find( { role : 0 } )
  .exec()
  .then(theUser => {
    return res.json(theUser);
  })
  .catch(e => {
    console.log('고객정보가 없습니다.', e)
  })
  
});
//회원 목록 삭제

app.get("/customerdel",  (req, res) => {


  User.remove({}, (err, kitties) => {
    if(err) return res.json(err);
  return res.status(200).send({ success: true });
  });
  
});




//고객정보 변경  
app.post("/customerinfo", async (req, res) => {
  const name2 = req.body.emailOri;
  const update = req.body;
  const filter = {email : name2};// 어차피 인벤토리는 하나이기 때문에 데이터 삽입시 만들어진 아이디를 사용. 

  User.findOneAndUpdate(filter, update, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});


// 내 주문 목록 보여주기
app.get("/myorderlist",  (req, res) => {
 
    User.findOne( { token: { $ne: "" }, role: 0 })
    .exec()
    .then(theUser => {
      console.log(theUser);
      let myname = theUser.email;
      return PrevOrder.find({ email: myname });
    })
    .then(prev => {
      res.json(prev);
    });
  
//   var myname ;
//   User.findOne( { token: { $ne: null } }, (err,user) =>{
//     if (!user) {
//       return res.json({
//         Success: false,
//         message: "장바구니에 해당하는 유저가 없습니다.",
//       });
//     }
//     myname = user.email;
//   });

//   PrevOrder.find({ email: myname }, (err, user) => {
//     console.log(user);
//     if (!user) {
//       return res.json({
//         Success: false,
//         message: "장바구니에 해당하는 유저가 없습니다.",
//       });
//     }
//     res.json(user);
// });
});

// 모든 주문 목록 보여주기
app.get("/allorderlist",  (req, res) => {
 
  PrevOrder.find( { })
  .exec()
  .then(prev => {
    res.json(prev);
  });
});

//재고 불러오기 
app.get("/inventory",  (req, res) => {

  Inventory.find( {})
  .then((inven) => {
    return res.json(inven); 
  } )    
});

//재고 변경  
app.post("/inventory", async (req, res) => {
  console.log(req.body);
  const update = req.body;
  const filter =  "637a0fb86f95953a1c09b161";// 어차피 인벤토리는 하나이기 때문에 데이터 삽입시 만들어진 아이디를 사용. 
  

  Inventory.findByIdAndUpdate(filter, update, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});


//주문 목록 보여주기 
app.get("/prevorders",  (req, res) => {

  PrevOrder.find( { token: { $ne: "" }, role: { $ne: 77 } }, (err,prevorder) =>{
    if (!prevorder) {
      return res.json({
        Success: false,
        message: "재고가 없습니다.",
      });
    }
    res.json(prevorder);
  });
});



//주문 목록에서 status를 변경하기 
app.post("/prevorder", async (req, res) => {
  
  const cartid = req.body._id;
  const cartstatus = req.body.status;
  const update = { status : cartstatus };
  const filter = {_id : cartid};
  

  PrevOrder.findOneAndUpdate(filter, update, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

//장바구니에서 status를 변경하기 
app.post("/cartrev", async (req, res) => {
  
  const cartid = req.body._id;
  const cartstatus = req.body.dinnerStyle;
  const cartnum = req.body.num;
  const cartcoffee = req.body.coffee;
  const cartbread = req.body.bread;
  const cartsteak = req.body.steak;
  const cartmessage = req.body.message;
  const update = { dinnerStyle : cartstatus , num : cartnum, coffee: cartcoffee, bread:cartbread, steak:cartsteak, message: cartmessage};
  const filter = {_id : cartid};
  

  Cart.findOneAndUpdate(filter, update, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

//이전 주문 목록 삭제

app.get("/prevorderdel",  (req, res) => {


  PrevOrder.remove({}, (err, kitties) => {
    if(err) return res.json(err);
  return res.status(200).send({ success: true });
  });
  
});


// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../prototype_01/build/index.html'));
//   });

//리액트 라우팅
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "build/index.html"));
// __dirname: 현재 디렉토리 , "~" : 리액트에서 npm run build 후 해당 index.html(리액트는 여기서 라우팅 다 이루어짐)으로 이동
//   });
// app.use("/", home); // home 경로에 가서 index.js의 코드를 실행,  라우팅


// app.get('*', function ( req, res) {
//     res.sendFile(path.join(__dirname, '/prototype_01/build/index.html'));
//   });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
module.exports = app;
