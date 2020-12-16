import styled, { keyframes } from 'styled-components'
const sRippleDup = keyframes`
    0% {
        transform: scale(0);
    }
    30% {
        transform: scale(1);
    }
    60% {
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
`
const sRipple = keyframes`
    0% {
        transform: scale(0);
    }
    20% {
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
`
const LabelContainer = styled.label`
    font-family: arial;
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 5px;
    padding-top: 3px;
    cursor: pointer;
    font-size: 16px;
`

const Checkmark = styled.div`
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    border: 0px solid #000000;
    border-radius: 0px;
    ${LabelContainer} &:after{
        left: 8px;
        top: 4px;
        width: 3px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
    &:after { 
        box-sizing: unset;
        content: '';
        position: absolute;
        display: none;
    }
    ${LabelContainer} &:befor {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 4.5rem;
        height: 4.5rem;
        margin-left: -1.3rem;
        margin-top: -1.3rem;
        background: #2aa1c0;
        border-radius: 3rem;
        opacity: 0.6;
        z-index: 99999;
        transform: scale(0);
    }
    ${LabelContainer}:checked ~ &:after{
        display: block;
    }
    
`;

const CheckboxInput = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;

    ${LabelContainer}:hover ${Checkmark} ~ ${Checkmark}, ${LabelContainer} &:focus ~ ${Checkmark}{
        background: red;
    }
    ${LabelContainer} &:checked ~ ${Checkmark} {
        background: #fff;
        transform: rotate(45deg);
        height: 20px;
        width: 9px;
        border-bottom: 4px solid ${props => props.color};
        border-right: 4px solid ${props => props.color};
        margin: 0 10px;
    }
    ${LabelContainer} ${Checkmark} + ${Checkmark}::before {
        animation: ${sRipple} 250ms ease-out;
    }
    ${LabelContainer} &:checked + ${Checkmark}::before {
        animation-name: ${sRippleDup};
    }
`
export const CheckBox = ({ label, checked, color }) => {
    return (
        <LabelContainer className="container">
            {label}
            <CheckboxInput readOnly type="checkbox" checked={checked} color={color} />
            <Checkmark className="checkmark" />
        </LabelContainer>
    )

}