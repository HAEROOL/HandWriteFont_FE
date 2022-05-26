import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import * as S from './Profile.Style'
import ProfileInfoChange from "./ProfileInfoChange";
import ProfileInfoNotChange from "./PrifileInfoNotChange";
import { useDispatch } from "react-redux";
import logined from "../../api/logined";
import { useSelector } from "react-redux";
import MypageHeader from "./MypageHeader";
import { COLOR } from "../../staticColor";
const PageWrapper = styled.div`
    width: 600px;
    margin: 0 auto;
    margin-top: -1px;
    &:before{
        width: 480px;
        margin-left: 166px;
        display: block;
        content:"";
        border-top: 1px solid ${COLOR.lightgray};
    }
`
const dummy = {
    email:'asdasdfasdff@aasdfasdfdsf.com',
    name: 'LEess',
    nickname: 'cococo',
    password: null,
    fonts:[]
}
const Profile = () => {
    // const [userInfo, setInfo] = useState({
    //     email: '',
    //     nickname: '',
    //     password: null,
    //     name: '',
    //     fonts: []
    // })
    const [userInfo, setInfo] = useState({
        ...dummy
    })
    const userAccount = localStorage.getItem('userAccount')
    const dispatch = useDispatch()
    
    useLayoutEffect(() => {
        // dispatch(getUserInfo({email:'admin@admin.com'}))
        logined.get(`users/${userAccount}/`)
        .then((response) => {
            setInfo({
                ...userInfo,
                ...response.data
            })
        })
    },[])

    return(
        <PageWrapper>
        <S.ProfilePannel>
            <S.ProfileWrapper>
                <S.Comment>{userInfo.name}님 안녕하세요</S.Comment>
                <ProfileInfoNotChange infoname={'이름'} content={userInfo.name}/>
                <ProfileInfoNotChange infoname={'닉네임'} content={userInfo.nickname}/>
                <ProfileInfoNotChange infoname={'이메일'} content={userInfo.email}/>
                <ProfileInfoChange infoname={'비밀번호'} content={null}/>
            </S.ProfileWrapper>
        </S.ProfilePannel>
        </PageWrapper>
        
    )
}

export default Profile;