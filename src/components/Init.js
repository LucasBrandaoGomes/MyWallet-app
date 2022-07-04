import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

export default function Init(){
    
    const navigate = useNavigate();

    function SignUp(){
        navigate("/signup")
    }

    function SignIn(){
        navigate("/login")
    }

    return(
        <>
            <h1>MyWallet</h1>
            <Welcome>
                <Entrar onClick={SignIn}>Sign in</Entrar>
                <Entrar onClick={SignUp}>Sign up</Entrar>
            </Welcome>
        </>
    )
}
const Welcome = styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
`
const Entrar = styled.button`
    width: 120px;
    height: 45px;
    background: #A328D6;
    border: none;
    border-radius: 4.63636px;
    text-decoration: none; 
    display:flex;
    align-items:center;
    justify-content:center;
    
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #FFFFFF;

    opacity: ${props => props.disabled ? 0.4 : 1 };
    &:hover{
        cursor:pointer;
    }
`