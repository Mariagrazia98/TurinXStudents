import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function ApartmentsButton(props) {
  const navigate = useNavigate();

  const handleSearchApartments = () =>{
    navigate("/areas/"+props.idArea+"/apartments");
  }

  let name = props.name;

  if(name === "Borgo San Paolo")
    name = "B. SAN PAOLO";
  else if(name === "San Salvario")
    name = "S. SALVARIO";

  return (
    <Box class="floatingBut">
      <Fab variant="extended" size="medium" aria-label="add" style={{backgroundColor:"#016FB9", color:"white"}} onClick={() => handleSearchApartments()}>
        <SearchIcon sx={{ mr: 1 }} style={{fontSize:"26px"}}/>
        <p  style={{fontSize:"15px"}}>SEARCH APARTMENTS IN {name}</p>
      </Fab>
    </Box>
  );
}