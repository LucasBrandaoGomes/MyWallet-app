import styled from "styled-components"
import {useState} from "react"
import axios from "axios"
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin";

    
    const { infoLogin } = useContext(InfoLoginContext);
    const [creditValue, setCreditValue] = useState(fal
    const [meusHabitos, setMeusHabitos] =useState([]);

export function Addcredit(){
    return(
        <>  
            <hi></hi>
            <Form onSubmit={SubmitLogin}>
                <input type="number" disabled={disableButton} placeholder="valor"  value={creditValue} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" disabled={disableButton} placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <Entrar type="submit" disabled={disableButton}>{disableButton ? <ThreeDots color="white"/> : "Entrar"}</Entrar>
            </Form >
            <Cadastrese>
                <Link to="/signup">
                    <p>Não tem uma conta?Cadastre-se</p>
                </Link>
            </Cadastrese>
        </>
   )
}
