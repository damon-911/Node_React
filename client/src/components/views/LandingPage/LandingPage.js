import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage(props) {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/hello').then((response) => console.log(response.data));
    }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout').then((response) => {
            if (response.data.success) {
                alert('로그아웃이 완료되었습니다.');
                navigate('/login');
            } else {
                alert('로그아웃 실패!');
            }
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <form>
                <h2>시작 페이지</h2>

                <button onClick={onClickHandler}>로그아웃</button>
            </form>
        </div>
    );
}

export default LandingPage;
