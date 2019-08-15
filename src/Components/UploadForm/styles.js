import styled, { css } from 'styled-components';

const dragActive = css`
    border-color: #78e5d5;

`;

const dragReject = css`
   border-color: #e57878;
`;

export const Container = styled.div.attrs({
  className: 'dropzone',
})`
   border: 1px dashed #ec912d;
   border-radius: 4px;
   cursor: pointer;
   transition: height 0.2s ease;
   ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject}; 
`;


const messageColors = {
  default: '#ec912d',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p`
   display: flex;
   justify-content: center;
   color: ${(props) => messageColors[props.type || 'default']};
   align-items: center;
   padding: 15px 0;
   font-weight: bold;
`;
