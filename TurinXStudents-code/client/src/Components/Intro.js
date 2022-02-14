import {Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
function Intro(){
    const navigate = useNavigate();
    useEffect(() => {
        document.getElementById("intro").addEventListener('click', () => navigate('/questionnaire'), { once: true });
    }, [])

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}
            id="intro"
        >
            <img src="/logo192.png" alt="Intro" style={{ marginBottom:"2rem", height: "220px", width: "220px" }}/>
            <h1 class="pressDesign">PRESS</h1>
            <h1 class="pressDesign">TO</h1>
            <h1 class="pressDesign">START</h1>
        </Grid>
    )
}

export default Intro;