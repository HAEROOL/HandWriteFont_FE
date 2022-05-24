import React, { useState } from "react";
import styled from "styled-components";
import logined from "../../api/logined";
import * as S from './Public.style'

export const UploadBtn = styled.label`
    width: 172px;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #fff;
    background: #000;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #ddd;
    transition: all 0.2s;
    text-decoration-line: none;
    &:hover{
        top: 265px;
        box-shadow: 2px 2px 10px silver;
    }
`
const FontNameInput = styled.input`
    width: 216px;
    height: 48px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 15px;
    outline: none;
    border-radius: 10px;
    margin: 15px 0 0 0;
`
const SecondPannel = () => {
    const [img, setImage] = useState(null)
    const [name, setName] = useState(null)
    const onChange = (e) => {
        setImage(e.target.files[0])
    }
    const nameChange = (e) => {
        setName(e.target.value)
    }
    const onClick = async() => {
        const formData = new FormData();
        formData.append('file', img)
        formData.append('name', name)
        formData.append('owner', localStorage.getItem('userAccount'))
        logined.post('/fonts/',formData)
        .then((response) => {
            console.log('success')
        }).catch(e => {
            console.log(e)
        })
        console.log(img)
        console.log(name)
        console.log(formData)
    }
    return (
        <S.Container>
            <S.CommandText>step 2. 작성한 템플릿을 업로드 해주세요!</S.CommandText>
            <S.Pannel>
                <S.DownloadBtnPannel>
                <form>
                    <UploadBtn htmlFor='upload-file'>템플릿 업로드</UploadBtn>
                    <input type="file" id="upload-file" onChange={onChange} style={{display:"none"}} required/>
                    <FontNameInput placeholder="폰트 이름을 정해주세요" required onChange={nameChange}/>
                </form>
                <button onClick={onClick}>제출</button>
                </S.DownloadBtnPannel>
                <S.StepPannel>
                <S.PrevBtn to='/fontcreate'>PREV</S.PrevBtn>
                <S.NextBtn to='/fontcreate/fourth'>NEXT</S.NextBtn>
                </S.StepPannel>
            </S.Pannel>
        </S.Container>
    )
}

export default SecondPannel;