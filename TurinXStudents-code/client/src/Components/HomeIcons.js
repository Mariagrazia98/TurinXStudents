import {Box, Grid, Typography} from '@mui/material';
import BathtubRoundedIcon from '@mui/icons-material/BathtubRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CropRoundedIcon from '@mui/icons-material/CropRounded';

export default function HomeIcons(props) {
    return(
        <Box m={1} ml={2} mr={2} p={1} sx={{backgroundColor: '#DAE2E7', borderRadius: 5}}>
            <Grid sx={{pl:2, pr:2}} container direction="row" justifyContent="center" alignItems="center" columnSpacing={0}>
              <Grid xs={3} mr={0} item align="center">
                <BathtubRoundedIcon style={{fontSize:"28px", color: "#384B56"}}/>
                <Typography align="center" style={{fontSize:"12px", color: "#384B56"}}> <b>{props.bathrooms}</b> bathrooms </Typography>
              </Grid>
              <Grid xs={3} item align="center">
                <KingBedRoundedIcon style={{fontSize:"28px", color: "#384B56"}}/>
                <Typography align="center" style={{fontSize:"12px", color: "#384B56"}}> <b>{props.bedrooms}</b> bedrooms </Typography>
              </Grid>
              <Grid xs={3} item align="center">
                <PeopleRoundedIcon style={{fontSize:"28px", color: "#384B56"}}/>
                <Typography align="center" style={{fontSize:"12px", color: "#384B56"}}> <b>{props.people}</b> people </Typography>
              </Grid>
              <Grid xs={3} item align="center">
                <CropRoundedIcon style={{fontSize:"28px", color: "#384B56"}}/>
                <Typography align="center" style={{fontSize:"12px", color: "#384B56"}}> <b>{props.sqmt}</b> sqmt </Typography>
              </Grid>
            </Grid>
          </Box>
    ); 
}