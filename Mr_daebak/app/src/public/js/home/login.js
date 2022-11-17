"use strict";


const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const loginBtn = document.querySelector('#button'); //하나밖에 없어서


loginBtn.addEventListener("click", login);

function login(){
    const req = {
        id: id.value,
        psword: psword.value,
    };

    fetch("/login", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(req),
    }).then((res)=> res.json())
    .then((res)=>{
        if(res.success === '1'){
            location.href = "/";
            // location.href = 현재 접속중인 페이지 정보
        }
        else if(res.success === '2'){
            location.href = "/homeCook";
            // location.href = 현재 접속중인 페이지 정보
        }
        else if(res.success === '3'){
            location.href = "/homeDelivery";
            // location.href = 현재 접속중인 페이지 정보
        }else{
            alert(res.msg);
        }
    })
    // res.json()는 프로미스 형태라 then으로 처리해줘야 함.
    //body에 데이터가 문자열화 된 json으로 들어감 
    .catch((err)=>{
        console.error(new Error ("로그인 중 에러 발생"));
    });
}




