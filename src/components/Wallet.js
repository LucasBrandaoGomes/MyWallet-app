import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import {useEffect} from 'react';
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin";
import {useNavigate} from 'react-router-dom';

export default function Wallet(){

    const navigate = useNavigate();
    const { infoLogin } = useContext(InfoLoginContext);
    const [myWallet, setMyWallet] = useState([])
    const [reload, setReload] = useState(false);

    const config = 
    {
        headers:{Authorization: `Bearer ${infoLogin.token}`}
    }
    
    useEffect(() => {

    const promise = axios.get("https://back-api-mywallet.herokuapp.com/wallet", config)
    
    promise.then(res => {
        setMyWallet([...res.data]);
        });
    }, [reload]);

    function Registers(){

        function OverBalance(){
            let soma = 0;
            for (let i=0; i<myWallet.length; i++){
                if (myWallet[i].type === "credit"){
                    soma+= Number.parseFloat(myWallet[i].amount)
                }else{
                    soma-= Number.parseFloat(myWallet[i].amount)
                }
            }
            return soma.toFixed(2)
        }
        
        function Delete({id}) {
        
            axios.delete(`https://back-api-mywallet.herokuapp.com/wallet/${id}`, config)
              .then(res => {
                  setReload(!reload);})
                  
              .catch(err => {
              console.error('Não foi possível apagar valor');
              console.error(err);
            });
          
      }
        
        function Register({date, details, amount, type, id}){
            return (
                <>
                    <List type={type}>
                        <div>
                            <p>{date}</p>
                            <p>{details}</p>
                        </div>
                        <div>
                            <p>{amount}</p>
                            <ion-icon onClick={() => Delete({id})} name="close-outline"></ion-icon>
                        </div>
                    </List>
                </>
            )
        }

        return (
            <>
                <Main>
                    {myWallet.map(item => <Register date={item.date} details={item.discription} type={item.type} amount={item.amount} id={item._id}/>)}    
                    <Balance><p>SALDO</p><p>{OverBalance()}</p></Balance>
                </Main>
            </>
        )
    }

    function AddNewCredit(){
        navigate("/addcredit")
    }

    function AddNewDebit(){
        navigate("/adddebit")
    }

    function Logout(){
        
        axios.delete(`https://back-api-mywallet.herokuapp.com/wallet`, config)
          .then(res => {
              navigate('/login');})
          .catch(err => {
            console.log("falhou a sair")
          console.error(err);
        });
      
    }

    return(
        <>  
            <Top>
                <p>Olá, {infoLogin.name}</p>
                <ion-icon onClick={Logout} name="exit-outline"></ion-icon>
            </Top>
            {myWallet.length === 0 ?<Empty><p>Não há registros de entrada e saída</p></Empty> 
            :
            <Registers />}
            <Footer>
                <Box onClick={AddNewCredit}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </Box>
                <Box onClick={AddNewDebit}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </Box>
            </Footer>
        </>
   )
}
const Top = styled.div`
    display: flex;
    justify-content:space-between;
    align-items:center;
    width: 326px;
    margin-bottom: 22px;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    ion-icon{
        font-size: 32px;
        color: #FFFFFF;
        &:hover{
            cursor: pointer;
        }
    }
`
const Empty = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    p{
        width: 180px;
        height: 46px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: #868686;
    }

`
const Main = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    box-sizing: border-box;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    padding-top:1px;
    position:relative;
`
const Footer = styled.div`
    display: flex;
    width:326px;
    justify-content:space-between;
    margin-top: 13px;
    box-sizing:border-box;
    `
const Box = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    
    width: 155px;
    height: 114px;
    left: 25px;
    top: 537px;

    background: #A328D6;
    border-radius: 5px;
    border:none;

    box-sizing: border-box;
    padding-top:11px;
    padding-left: 10px;
    padding-bottom:11px;

    p{
        width: 64px;
        height: 40px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #FFFFFF;
    }

    &:hover{
            cursor: pointer;
    }

    ion-icon{
        font-size: 24px;
        color: #FFFFFF;
    }
    `
const List = styled.div`
    display:flex;
    width:100%;
    box-sizing: border-box;
    padding-left:12px;
    padding-right:10px;
    padding-top: 10px;
    
    div:first-child{
        display:flex;

        p:first-child{
        width: 48px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #C6C6C6;
        }
        
        p:nth-child(2){
        width: 145px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;
        }
    }
    
    div:nth-child(2){
        display:flex;
        justify-content: flex-end;
        p:first-child{
            width: 62px;
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            text-align: right;

            color: ${props => props.type ==="debit" ? "#C70000" : "#03AC00"};
        }
        ion-icon{
            font-size: 20px;
            color: #C6C6C6;
            margin-left:20px;
            &:hover{
                cursor: pointer;
            }
        }
    }
`
const Balance = styled.div`
    display:flex;
    justify-content:space-between;
    width: 100%;
    box-sizing:border-box;
    padding-left:15px;
    padding-right:11px;
    padding-bottom:10px;
    position:absolute;
    bottom:0;
    left: 0;
    p:first-child{
        width: 57px;
        height: 20px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }
    p:nth-child(2){
        width: 63px;
        height: 20px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        text-align: right;

        color: #03AC00;
    }
`