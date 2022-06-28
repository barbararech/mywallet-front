import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 25px;
    background: #8c11be;
    font-family: 'Raleway', sans-serif;
    overflow: hidden;
  }
 
  h1{
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    font-weight: 400;
    color:#FFFFFF;
    margin-bottom: 28px;

  }

  input{
      background-color:#FFFFFF;
      width:100%;
      height:58px;
      color: #000000;
      text-decoration:none;
      border: none;
      border-radius: 5px;
      margin-bottom: 13px;
      font-family: 'Raleway', sans-serif;
      font-size: 20px;
      font-weight: 400;
      padding: 16px;
  }

  a{
    color:#FFFFFF;
    margin-top: 34px;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
  }

  button{
      background-color:#A328D6;
      width:100%;
      height:46px;
      color: #FFFFFF;
      border: none;
      border-radius: 5px;
      font-family: 'Raleway', sans-serif;
      font-size: 20px;
      font-weight: 700;
      padding: 12px;
      cursor:pointer;
  }
`;

export default GlobalStyle;
