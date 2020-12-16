import React from 'react';
import styled from 'styled-components';

const Confirmation = styled.div`
    background-color: ${props => props.color};
    width: 100%;
    height: 58px;
    z-index: 9;
    border-radius: 5px;
`;
const Block = styled.div`
    width: 100%;
    height: 100%;
    font-size:25px;
    display:flex;
    align-items: center;
    padding: 0px 20px;
    justify-content: ${props => props.active ? 'flex-start' : 'flex-end'};
`

export const ConfitmationBlock = ({ active, color }) => {
    return <Confirmation color={color}>
        <Block active={active}>
            {active ? "complete" : 'in complete'}
        </Block>
    </Confirmation>
}