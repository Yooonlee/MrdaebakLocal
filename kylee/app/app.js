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

//회원가입
app.post("/register", (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
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
app.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

//장바구니 추가 
app.post("/menu", (req, res) => {
  var cart = new Cart(req.body);
  console.log(req.body);
  var myname ;
  var myaddress ;
  User.findOne( { token: { $ne: '' } }, (err,user) =>{
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    myname = user.name;
    myaddress = user.address;
  });
  cart.name = myname;
  cart.address = myaddress;

  cart.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 장바구니 보여주기
app.get("/cart",  (req, res) => {

  var myname ;
  User.findOne( { token: { $ne: '' } }, (err,user) =>{
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    myname = user.name;
  });

  Cart.findOne({ name: myname }, (err, user) => {
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    res.json(user);
});
});



//이전 주문목록에 추가 
app.post("/cart", (req, res) => {
  var user2;
  User.findOne( { token: { $ne: '' } }, (err,user) =>{
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    user2 = user.name;
  });

  var a = Cart.findOne( { name: user2 }, (err,user) =>{
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    return(user);
  });
  // console.log(JSON.stringify(a));
  var prevorder2 = new PrevOrder(a);

  prevorder2.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 고객정보 보여주기
app.get("/customerinfo",  (req, res) => {

  var myname ;
  User.findOne( { token: { $ne: '' } }, (err,user) =>{
    if (!user) {
      return res.json({
        Success: false,
        message: "해당하는 유저가 없습니다.",
      });
    }
    res.json(user);
  });
});

// 내 주문 목록 보여주기
app.get("/myorderlist",  (req, res) => {

  var myname ;
  User.findOne( { token: { $ne: '' } }, (err,user) =>{
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    myname = user.name;
  });

  PrevOrder.findOne({ name: myname }, (err, user) => {
    if (!user) {
      return res.json({
        Success: false,
        message: "장바구니에 해당하는 유저가 없습니다.",
      });
    }
    res.json(user);
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
