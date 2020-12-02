import styled from 'styled-components';
import { CheckBox } from './checkBox';

const Item = styled.div`
    padding: 5px;
    font-size: 10px;
`;
export const CardItem = ({ checked, name,id, checkHandeler}) => {
    return (
        <Item>
            <CheckBox 
                checked={checked}
                label={name}
                change={value => checkHandeler(value,id)}
            />
        </Item>
    )
}