
import styled from "styled-components"
import { useState } from  "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup'
import InfoLoginContext from "../contexts/InfoLogin";

export default function App(){
    
    const [infoLogin, setInfoLogin] = useState({});
    
    return(
        <InfoLoginContext.Provider value = {{infoLogin , setInfoLogin}}>
            <BrowserRouter>
                    <div className="root">
                        <Container>
                            <Routes>
                                <Route path="/" element={<Login />}/>
                                <Route path="/signup" element={<Signup />}/>
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