import styled from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import  { useState } from  "react"
import { ThreeDots } from "react-loader-spinner";


export default function Signup(){
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [disableButton,setDisableButton] = useState(false)


    function SubmitSignUp(event){
        event.preventDefault();
        
        setDisableButton(true);
        
        const infoSignUp =
            {
                email,
                name,
                password,
                passwordConfirmation
            }
        

        const promise = axios.post("https://back-api-mywallet.herokuapp.com/signup", infoSignUp)
        
        promise
        .then(res =>{ 
            navigate("/login");
        })
        .catch(err=> {alert("Erro, preencha corretamente os dados");
        setDisableButton(false);});

    }

    return(
        <>
            <h1>MyWallet</h1>
            <Form onSubmit={SubmitSignUp} >
                
                <input type="text" disabled={disableButton} placeholder="nome" value={name} onChange={e => setName(e.target.value)} required/>
                <input type="email" disabled={disableButton} placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" disabled={disableButton} placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                <input type="password" disabled={disableButton} placeholder="confirmação de senha" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required/>
                <Cadastrar type="submit" disabled={disableButton}>{disableButton ? <ThreeDots color="white"/> : "Cadastrar"}</Cadastrar>
            </Form >
            <Loguese>
                <Link to="/login">
                    <p>Já tem uma conta?Faça login</p>
                </Link>
            </Loguese>
        </>
   )
}

const Form = styled.form`
    display:flex;
    flex-direction: column;
    width: 303px;
    background-color: #8C11BE;
    input{
        background: ${props => props.disabled ? "grey" : "#ffffff"};
        color: ${props => props.disabled ? "#AFAFAF" : "grey"};
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom:8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        ::placeholder{
            font-size: 18px;
            color: #DBDBDB;}
        }
`
const Cadastrar = styled.button`
    width: 303px;
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
const Loguese = styled.div`
    margin-top:35px;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;


        color: #FFFFFF;
    }
    `