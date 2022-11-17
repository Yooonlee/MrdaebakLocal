"use strict";


const id = document.querySelector('#id');
const name = document.querySelector('#name');
const psword = document.querySelector('#psword');
const confirmPsword = document.querySelector('#confirm-psword');
const registerBtn = document.querySelector('#button'); //하나밖에 없어서


registerBtn.addEventListener("click", register);

function register(){

    if(!id.value) return alert("아이디를 입력해 주십시오.");
    if(psword.value !== confirmPsword.value)
        return alert("비밀번호가 일치하지 않습니다.");
    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,

    };
    console.log(req);
    fetch("/register", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(req),
    }).then((res)=> res.json())
    .then((res)=>{
        if(res.success){
            location.href = "/login";
            // location.href = 현재 접속중인 페이지 정보
        }else{
            alert(res.msg);
        }
    })
    // res.json()는 프로미스 형태라 then으로 처리해줘야 함.
    // body에 데이터가 문자열화 된 json으로 들어감 
    .catch((err)=>{
        console.error(new Error ("회원가입 중 에러 발생"));
    });
}




