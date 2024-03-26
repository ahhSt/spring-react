import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import '../asset/css/Login.css';
import BartLogo from '../asset/images/bart-logo.png';

const StyledMain = styled.main`
  background-image: url(../../asset/images/login-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  height:100vh;
`;

function Main({children}) {
    return <StyledMain>{children}</StyledMain>
}

const StyledSection = styled.section`
  background-color: #fff;
  padding: calc(100vw * (50 / 1920)) calc(100vw * (100 / 1920))
    calc(100vw * (40 / 1920));
//  position: absolute;
  transform: translateX(60%);
  border-radius: 10px;
  text-align: center;
  width: calc(100vw * (600 / 1920));
  max-width: 600px;
  min-width: 200px;
`;

function Section({children}) {
    return <StyledSection>{children}</StyledSection>
}

function Login() {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [message, setMessage] = useState('')

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    };

	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login');
        const formData = new FormData();
        // 추가(key, value)
        formData.append('username', inputId);
        formData.append('password', inputPw);

        axios.post(process.env.REACT_APP_API_URL + '/auth/authenticate', formData,
                )
                .then(
                    res => {
                        console.log(res)
                        localStorage.setItem("accessToken", res.data.token)
                        navigate("/")
                    }
                )
                .catch(function (error){
                    console.log(error);
                    setMessage("Check ID and Password");
                })
    };

	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        console.log('login');
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []);

    return(
        <Main>
            <Section className="login__content">
                <img src={BartLogo} />
                <p className="login__content__desc">BART AFC Log-on page</p>
                  <input type="text"
                      className="common-input"
                      name='username'
                      placeholder="ID"
                      value={inputId}
                      onChange={handleInputId}
                  />
                  <input
                      type="password"
                      className="common-input login__content__pw"
                      name='password'
                      placeholder="Password"
                      value={inputPw}
                      onChange={handleInputPw}
                  />
                <button className="common-btn login__content__btn" type='button' onClick={onClickLogin}>Login</button>
            </Section>
        </Main>
    )
}

export default Login;