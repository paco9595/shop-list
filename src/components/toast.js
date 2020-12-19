import React from 'react'
import { DefaultToast } from 'react-toast-notifications';
import styled from 'styled-components';

const ToastContainer = styled.div`
`;

export const Toast = ({ children, ...props }) => (
    <DefaultToast {...props} >
      <ToastContainer>{children}</ToastContainer>
    </DefaultToast>
  );