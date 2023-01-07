import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
    // null    =>  아무나 출입이 가능한 페이지
    // true    =>  로그인한 유저만 출입이 가능한 페이지
    // false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log(response);
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        alert('로그인이 필요합니다.');
                        navigate('/login');
                    }
                } else {
                    // 로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        alert('관리자만 접속 가능합니다.');
                        navigate('/');
                    } else {
                        if (option === false) {
                            alert('이미 로그인을 한 상태입니다.');
                            navigate('/');
                        }
                    }
                }
            });
        }, []);

        return <SpecificComponent />;
    }
    return AuthenticationCheck;
}
