import React from 'react';
import styled from 'styled-components';

const Circule = styled.img`
	border-radius: 50%;
	width: ${props=> props.width || 25}px;
	height: ${props => props.height || 25}px;
	
`;

export const CirculeImage = props => {
	return <Circule src={props.src}/> 
}

