import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin";


export function Adddebit(){

    const { infoLogin } = useContext(InfoLoginContext);
    const [debitValue, setDebitValue] = useState();
    const [valueDescription, setValueDescription] = useState();
    const [disableButton,setDisableButton] = useState(false)

    function SubmitAdd(e){
        e.preventDefault();
        
        setDisableButton(true);

        const newDebit =
            {
                amount: debitValue,
                discription: valueDescription
            }
        
         const config = {
                headers: {
                    Authorization: `Bearer ${infoLogin.token}`
                }
            }       
        const promise = axios.post("http://localhost:5000/adddebit", newDebit, config)
        
        promise            
        .then(res => {
            console.log("valor enviado com sucesso")
            res.sendStatus(200)
            //navigate("/hoje");

        })
        .catch(err=> {
            alert("Erro ao enviar valor");
            setDisableButton(false)})
    }

    return(
        <>  
            <h1>Nova saída</h1>
            <Form onSubmit={SubmitAdd}>
                <input type="number" disabled={disableButton} placeholder="valor"  value={debitValue} onChange={e => setDebitValue(e.target.value)} required/>
                <input type="string" disabled={disableButton} placeholder="decrição" value={valueDescription} onChange={e => setValueDescription(e.target.value)} required/>
                <SalvarSaida type="submit" disabled={disableButton}>{disableButton ? <ThreeDots color="white"/> : "Salvar saída"}</SalvarSaida>
            </Form >
            
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
            color: #DBDBDB;
        }
    }
`
const SalvarSaida = styled.button`
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