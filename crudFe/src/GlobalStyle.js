import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 1.1rem;
    }
    body{
        background-color: #8F2141; 
    }

    input[type="text"]::-webkit-input-placeholder{
        color:white;
        opacity: .7;
    }
    
    textarea::-webkit-input-placeholder{
        color:white;
        opacity: .7;
    }
`;

export default GlobalStyle;