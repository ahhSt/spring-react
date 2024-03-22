import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='username' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='password' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
            <div>
                <h2>{message}</h2>
            </div>
        </div>
    )
}

export default Login;