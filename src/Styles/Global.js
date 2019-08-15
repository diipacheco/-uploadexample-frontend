import { createGlobalStyle } from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
    *{
      padding: 0;
      margin: 0;
      outline: 0;
      box-sizing: border-box;
    }

    body{  
      font-family: 'Roboto', sans-serif;
      color: #FFF;
      background: #232F3E;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    

    }

    html, body, #root{
      height: 100%;
    }

`;
