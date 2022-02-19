import {Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Button, Grid, IconButton, Paper, Snackbar, Typography} from '@mui/material';
import Slide from '@mui/material/Slide';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ContactInformation from './ContactInformation';
import MySwiper from './MySwiper';
import HomeIcons from './HomeIcons';
import {BookmarkButton, ContactButton} from './MyButtons';
import API from '../API';
import computeDistance from './UniversityInfo';

export default function ApartmentScreen(props) {
  const [openSnack, setOpenSnack] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [apartment, setApartment] = useState({});
  const [ready, setReady] = useState(false);
  const [dist, setDist] = useState(0.0);

  const {id} = useParams();
  let apartmentId = id;

  useEffect(() => {
    const getApartment = async (apartmentId) => {
      try{
        const apartment = await API.getApartmentById(apartmentId);
        setApartment(apartment);
        if(props.savedList.some((element) => element.idApartment === apartment.idApartment))
          setIsSaved(true);
        else
          setIsSaved(false);
        props.setShowBackArrow(true);
        setDist(computeDistance(apartment,props.universityId));
        setReady(true);
      }catch (err){
        console.log(err);
      }
    }
    if(apartmentId !== undefined){
      getApartment(apartmentId);
      
    }
  }, [apartmentId, props])
 

  const actionSnack = (
    <Fragment>
      <Button color="secondary" size="small" onClick={() => {
        setOpenSnack(false);
        if(!isSaved)
          setIsSaved(true);
        else
          setIsSaved(false);
      }} style={{color: '#016FB9'}}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {setOpenSnack(false)}}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    
    <Grid container>

      <ContactButton setOpenContact={setOpenContact}></ContactButton>
      <BookmarkButton isSaved={isSaved} setIsSaved={setIsSaved} setOpenSnack={setOpenSnack}></BookmarkButton>

      <Grid item xs={12}>
        <MySwiper apartment={apartment} savedList={props.savedList} idUser={props.idUser}> </MySwiper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={0}>

          <Box m={1} p={1} pl={2}>
            <Typography style={{fontSize:"23px"}} py={1}> {apartment.title} in {apartment.area_name} </Typography>
            <Grid container direction="row" alignItems="flex-end">
              <Grid item>
                <Typography variant="h4"> € </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4"> <b>{apartment.price}</b> </Typography>
              </Grid>
              <Grid item> 
                <Typography variant="h5"> /month </Typography>
              </Grid>
            </Grid>
            <Typography style={{fontSize:"19px"}} color={"#384B56"} pt={1}> {apartment.address} </Typography>
            <Grid container direction="row" alignItems="flex-end" columnSpacing={1}>
              <Grid item>
                <Typography style={{fontSize:"20px"}} pt={0} color={"#384B56"} align='center'> <b>{dist}</b> km from your university </Typography>
              </Grid>
              <Grid item>
                <SchoolRoundedIcon justifycontent="center" fontSize="medium" mt={5} sx={{color: '#384B56'}}></SchoolRoundedIcon>
              </Grid>
            </Grid>
          </Box>

          <HomeIcons bathrooms={apartment.bathrooms} bedrooms={apartment.bedrooms} people={apartment.people} sqmt={apartment.sqmt} distance_university={apartment.distance_university}></HomeIcons>

          <Box m={1} p={2} mb={8}>
            <Typography style={{fontSize:"22px"}} pb={1}> Description </Typography>
            <Grid container direction="row" className="description">
              <Grid item>
                <Typography style={{fontSize:'15px'}}> {apartment.description} </Typography>
              </Grid>
            </Grid>
          </Box>

        </Paper>
      </Grid>

      {isSaved ? <Snackbar open={openSnack} autoHideDuration={4000}  sx={{ bottom: { xs: 64, sm: 0 }}}
        onClose={() => {
          setOpenSnack(false);
          props.addToSaved({apartmentId: apartment.idApartment, userId: props.idUser});
        }} message="Added to saved!" action={actionSnack}  TransitionComponent={TransitionRight}></Snackbar> : <Snackbar open={openSnack} autoHideDuration={4000} sx={{ bottom: { xs: 64, sm: 0 }}}  TransitionComponent={TransitionRight}
        onClose={() => {
          setOpenSnack(false);
          props.removeFromSaved({apartmentId: apartment.idApartment, userId: props.idUser});
        }} message="Removed from saved!" action={actionSnack}  TransitionComponent={TransitionRight}></Snackbar>}
        {ready ? <ContactInformation owner={apartment.owner} openContact={openContact} setOpenContact={setOpenContact}/> : null} 
    </Grid>
  );
}
function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}