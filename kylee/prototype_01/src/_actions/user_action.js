import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

//로그인
  // axios를 이용해 login 요청을 보내고 response.data를 반환하여 request에 넣어준다.

export function loginUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:8000/login", dataTosubmit)
    .then((response) => response.data);
  return {
    //
    type: LOGIN_USER,
    payload: request,
  };
}

//회원가입
export function registerUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:8000/register", dataTosubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

//인증처리
export function auth() {
  const request = axios
    .get("/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}