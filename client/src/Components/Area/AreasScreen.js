import { Box, Modal, Stack, Button, Divider, Grid, ListItemAvatar, ListItemText, Typography, List, ListItem, ListItemButton } from '@mui/material';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import NightlifeRoundedIcon from '@mui/icons-material/NightlifeRounded';
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { MapContainer, TileLayer, Marker, Polygon, Tooltip } from 'react-leaflet'
import AreaGrade from './Utilities/AreaGrade';
import BarChart from './Utilities/BarChart';
import ApartmentsButton from './Utilities/ApartmentsButton';
import ReviewLine from './Utilities/ReviewLine';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
import L from 'leaflet';
import marker from './Utilities/university.svg';
import PropTypes from 'prop-types';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#016FB9' : '#308fe8',
  },
}));

export default function AreasScreen(props) {
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { universityId, bestAreas, setIdArea, idArea, totAreas, setShowBackArrow } = props;

  const [areas, setAreas] = useState([]);
  const [gotAreas, setGotAreas] = useState(false);

  const [showInfo, setShowInfo] = useState(false);
  const [index, setIndex] = useState(0);
  const dense = true;
  const areasChar = ["Public transport", "Green areas", "Night life", "Safety", "Shopping"];

  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [50, 50],
  });

  useEffect(() => {
    props.setIntro(false);
    if(!props.loading){
      let tmp = [];
      for (let i = 0; i < totAreas.length; i++) {
        for (let j = 0; j < bestAreas.length; j++) {
          if (totAreas[i].id === bestAreas[j].area_id) {
            totAreas[i].compatibility = bestAreas[j].compatibility;
            tmp.push(totAreas[i]);
          }
        }
      }
      tmp.sort((a, b) => b.compatibility - a.compatibility);
      setAreas(tmp);
      setGotAreas(true);
    }
  }, [props.loading])

  useEffect(() => {
    if (reviewsLoaded === false) {
      API.getReviews().then((rev) => {
        setReviewsLoaded(true);
        setReviews(rev);
      })
    }
  }, [reviewsLoaded])

  const uni_positions = [[45.062438755702985, 7.662376060202287], [45.07364781279697, 7.6993552540697765], [45.06808712754069, 7.694365569412544]]

  const handleClose = () => {
    setShowInfo(false);
  }

  const handleForwardArrow = () => {
    setIdArea(idArea => idArea + 1);
  }

  const handleBackArrow = () => {
    setIdArea(idArea => idArea - 1);
  }

  const handleOpen = (index) => {
    setIndex(index);
    setShowInfo(true);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: "15px",
    p: 3
  };



  const blueOptions = { color: '#016FB9', fillColor: '#016FB9', fillOpacity: 0.2, weight: 3 }

  return (
    <>
      {
        !gotAreas ?
          <></>
          :
          <>
            <Modal
              open={showInfo}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" style={{ fontWeight: "600" }}>
                  {
                    (index === 0) ?
                      <DirectionsBusFilledRoundedIcon viewBox={'5 -5 10 25'} />
                      :
                      (index === 1) ?
                        <ParkRoundedIcon viewBox={'5 -5 10 25'} />
                        :
                        (index === 2) ?
                          <NightlifeRoundedIcon viewBox={'5 -5 10 25'} />
                          :
                          (index === 3) ?
                            <LocalPoliceRoundedIcon viewBox={'-5 -5 28 28'} pt={1} />
                            :
                            <ShoppingCartRoundedIcon viewBox={'5 -5 10 27'} />
                  }
                  {"  "}
                  {areasChar[index]}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  {areas[idArea].infos[areasChar[index]]}
                </Typography>
                <Button size="small" style={{ position: "absolute", right: "5px", top: "1rem", color: "black" }} onClick={() => setShowInfo(old => !old)}>
                  <CloseRoundedIcon />
                </Button>
              </Box>
            </Modal>

            <Box sx={{ p: 0 }}>
              <MapContainer style={{ "height": "25em" }} center={[45.0565621666855, 7.6584228557206755]} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon positions={areas[idArea].polygon} pathOptions={blueOptions} />
                <Marker position={uni_positions[universityId - 1]} icon={myIcon}>
                  <Tooltip>
                    Politecnico di Torino
                  </Tooltip>
                </Marker>
              </MapContainer>
              <hr className="rounded" style={{ margin: "0px" }}></hr>
            </Box>
            <Stack direction="row" sx={{ mt: 2 }}>
              <Grid container>
                {idArea > 0 ?

                  <Grid item xs={1} style={{ width: "100%" }}>
                    <Button onClick={() => handleBackArrow()} style={{ color: 'black', transform: "scale(1.2)" }} sx={{ mr: 3 }} >
                      <ArrowBackRoundedIcon />
                    </Button>
                  </Grid>
                  : <Grid item xs={1} style={{ width: "100%" }}>
                    <Button disabled style={{ color: 'black', transform: "scale(1.2)" }} sx={{ mr: "37px"}} >
                      {" "}
                    </Button>
                  </Grid>
                }
                <Grid item xs={10} style={{ width: "100%" }}>
                  <Grid container style={{ justifyContent: "center" }}>

                    <Typography align="center" variant="h5" component="div">
                      {idArea + 1 + ".  " + areas[idArea].name}
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    </Typography>
                    {/*
                    <Typography align="center" variant="h5" component="div">
                      {areas[idArea].compatibility} %
                    </Typography>
                    */}
                  </Grid>
                </Grid>
                {idArea >= areas.length - 1 ?
                  ""
                  :
                  <Grid item xs={1} style={{ width: "100%", marginLeft: "-37px" }}>
                    <Button onClick={() => handleForwardArrow()} style={{ color: 'black', transform: "scale(1.2)" }} sx={{ ml: 0 }} >
                      <ArrowForwardRoundedIcon />
                    </Button>
                  </Grid>
                }
              </Grid>
            </Stack>

            <Box className="boxCompatibility">
              <Typography class="compatibilityLine">
                Your compatibility with this area
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box ml={2} sx={{ width: '100%', mr: 1 }}>
                  <BorderLinearProgress variant="determinate" value={areas[idArea].compatibility} ml={1} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${areas[idArea].compatibility}%`}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ p: 2, pb: 0 }}>
              <div style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', p: 0, m: 0, bgcolor: 'background.paper', justifyContent: 'center' }}>
                </Box>
                <Divider />
                <Typography align="" sx={{ m: 1, p: 0, lineHeight: "14px" }} style={{ fontSize: "13px", color: '#545454' }} component="div">
                  The following informations are gathered from the last city annual report and can be consulted on the main website www.TorinoCity.com
                </Typography>
                <Divider />
              </div>


              <List sx={{ pb: 0, mb: 4 }} dense={dense}>
                <ListItem sx={{ pb: 0, pt: 0 }}>
                  <ListItemAvatar sx={{ p: 0 }}>
                    <DirectionsBusFilledRoundedIcon sx={{ pt: "5px" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h6" class="charac-area">{areasChar[0]}</Typography>}
                  />
                  <ListItemButton onClick={() => handleOpen(0)}>
                    <AreaGrade grade={areas[idArea].public_transport} />
                    <InfoIcon sx={{ ml: 1 }} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ ml: 1, mr: 2 }} />
                <ListItem sx={{ pb: 0, pt: 0 }}>
                  <ListItemAvatar sx={{ p: 0 }}>
                    <ParkRoundedIcon sx={{ pt: "5px" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h6" class="charac-area" >{areasChar[1]}</Typography>}
                  />
                  <ListItemButton onClick={() => handleOpen(1)}>
                    <AreaGrade grade={areas[idArea].green_areas} />
                    <InfoIcon sx={{ ml: 1 }} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ ml: 1, mr: 2 }} />
                <ListItem sx={{ pb: 0, pt: 0 }}>
                  <ListItemAvatar sx={{ p: 0 }}>
                    <NightlifeRoundedIcon sx={{ pt: "5px" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography class="charac-area" variant="h6" style={{}}>{areasChar[2]}</Typography>}
                  />
                  <ListItemButton onClick={() => handleOpen(2)}>
                    <AreaGrade grade={areas[idArea].night_life} />
                    <InfoIcon sx={{ ml: 1 }} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ ml: 1, mr: 2 }} />
                <ListItem sx={{ pb: 0, pt: 0 }}>
                  <ListItemAvatar sx={{ p: 0 }}>
                    <LocalPoliceRoundedIcon sx={{ pt: "5px" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography class="charac-area" variant="h6" style={{}}>{areasChar[3]}</Typography>}
                  />
                  <ListItemButton onClick={() => handleOpen(3)}>
                    <AreaGrade grade={areas[idArea].safety} />
                    <InfoIcon sx={{ ml: 1 }} />
                  </ListItemButton>
                </ListItem >
                <Divider sx={{ ml: 1, mr: 2 }} />
                <ListItem sx={{ pb: 0, pt: 0 }}>
                  <ListItemAvatar sx={{ p: 0 }}>
                    <ShoppingCartRoundedIcon sx={{ pt: "5px" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography class="charac-area" variant="h6" style={{}}>{areasChar[4]}</Typography>}
                  />
                  <ListItemButton onClick={() => handleOpen(4)}>
                    <AreaGrade grade={areas[idArea].shopping} />
                    <InfoIcon sx={{ ml: 1 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            {/*
            <Grid container sx={{textAlign: "center", mx:1}}>
              <Grid item xs={3}>
                Compatibility:
              </Grid>
              <Grid item xs={9}>
                <LinearWithLabel
                    value={areas[idArea].compatibility}
                    sx={{
                      color: '#016FB9',
                    }}/>
              </Grid>
            </Grid>*/}

            <Box className="reviewsContainer">
              <Typography align="center" variant="h5" sx={{ m: 0, mt: 2, p: 0 }} style={{ fontWeight: "500", fontSize: "17px", color: "#384B56" }} component="div">
                Users's reviews about
              </Typography>
              <p className="subtitle"> {areas[idArea].name}</p>
              <BarChart areaName={"Cenisia"} />
              <List class="reviewList" dense={dense}>
                {reviews.map((u, index) =>
                  <ReviewLine key={index + "-review-line"} name={u.name} age={u.age} rating={u.rating} text={u.text} />
                )}
              </List>

              <ExpandReviews setShowBackArrow={setShowBackArrow} />
            </Box>
            <ApartmentsButton idArea={areas[idArea].id} name={areas[idArea].name} />
          </>
      }
    </>
  );
}


function ExpandReviews(props) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => { navigate("/reviews/" + "Cenisia"); props.setShowBackArrow(true); }} variant="contained" style={{ fontSize: "15px", width: "95%", height: "10%", backgroundColor: "#618294" }} sx={{ m: 1 }}>
      see all reviews
      <ArrowForwardRoundedIcon style={{ marginLeft: "10px" }} />
    </Button>
  );
}

function LinearWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};