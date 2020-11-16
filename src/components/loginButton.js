import React from 'react';
import styled from 'styled-components';
import googleIcon from './../utilities/icons/googleIcon.svg'
import facebookIcon from './../utilities/icons/facebookIcon.svg'

const ButtonContainer = styled.div`
    height: 42px;
    width: 184px;
    background-color: ${props => props.theme.primaryBlue};
    border-radius: 2px;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
`;
const IconWrapper = styled.div`
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color:#fff;
`
const TextWrapper = styled.div`
    float: right;
    margin: 11px 11px 0 0;
    color: #fff;
    font-size: 13px;
    letter-spacing: 0.2px;
    font-family: "Roboto";    
`


export const LoginButton = props => {
    const { title, renderProps: { onClick }, type } = props;
    return (
        <ButtonContainer onClick={onClick} >
            <IconWrapper>
                <img src={type === 'google'? googleIcon: facebookIcon} alt='google icon' />
            </IconWrapper>
            <TextWrapper>
                {title}
            </TextWrapper>
        </ButtonContainer>

    )
}