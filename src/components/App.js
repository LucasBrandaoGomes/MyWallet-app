
import styled from "styled-components"
import { useState } from  "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup'
import Login from "./Login";
import InfoLoginContext from "../contexts/InfoLogin";
import Addcredit  from "./Addcredit";
import Adddebit  from "./Adddebit";
import Wallet from "./Wallet";
import Init from "./Init";

export default function App(){
    
    const [infoLogin, setInfoLogin] = useState({});
    
    return(
        <InfoLoginContext.Provider value = {{infoLogin , setInfoLogin}}>
            <BrowserRouter>
                    <div className="root">
                        <Container>
                            <Routes>
                                <Route path="/" element={<Init />}/>
                                <Route path="/login" element={<Login />}/>
                                <Route path="/signup" element={<Signup />}/>
                                <Route path="/addcredit" element={<Addcredit />}/>
                                <Route path="/adddebit" element={<Adddebit />}/>
                                <Route path="/wallet" element={<Wallet />}/>
                            </Routes>
                        </Container>
                    </div>
            </BrowserRouter>
        </InfoLoginContext.Provider>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    `