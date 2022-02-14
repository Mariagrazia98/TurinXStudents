import {
    Box,
    Container,
    Typography,
    Stack,
    Grid,
    Button,
    Snackbar,
    Fab,
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import {useState, Fragment} from 'react';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcons from './HomeIcons';
import API from './../API';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import {grey} from '@mui/material/colors';
import ContactInformation from './ContactInformation';
import computeDistance from './UniversityInfo';
import Slide from '@mui/material/Slide';

function ApartmentInfo(props) {
    const {apartment, saved, removeFromSaved, idUser, addToSaved, savedList, universityId, setDirty2} = props;
    const [addNoteButton, setAddNoteButton] = useState(false);
    const [note, setNote] = useState();
    const [openContact, setOpenContact] = useState(false);
    const [openNoteSnack, setOpenNoteSnack] = useState(false);
    const [openBookmarkSnack, setOpenBoomkmarkSnack] = useState(false);
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(savedList && savedList.some((element) => element.idApartment === apartment.idApartment));

    const contactInformationStyle = {
        bgcolor: grey[300],
        position: 'relative',
        top: 54,
        left: 15,
        zIndex: "inherit",
        marginTop: -10,
    }

    const actionNoteSnack = (
        <Fragment >
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setOpenNoteSnack(false)
                    saveNote();
                }}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Fragment>
    );
    const actionBookmarkSnack = (
        <Fragment>
            <Button color="secondary" size="small" style={{color: '#016FB9'}} onClick={() => {
                setOpenBoomkmarkSnack(false);
                if(!isSaved)
                    setIsSaved(true);
                else
                    setIsSaved(false);
            }}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setOpenBoomkmarkSnack(false)
                    addOrRemoveFromSaved();
                }}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Fragment>
    );

    const addOrRemoveFromSaved = () => {
        setOpenBoomkmarkSnack(false)
        if (saved) {
            removeFromSaved({
                apartmentId: apartment.idApartment,
                userId: idUser
            })
        } else {
            if (savedList.some((element) => element.idApartment === apartment.idApartment)) {
                removeFromSaved({
                    apartmentId: apartment.idApartment,
                    userId: idUser
                })
            } else {
                addToSaved({
                    apartmentId: apartment.idApartment,
                    userId: idUser
                })
            }
        }
    }
    const saveNote = () => {
        const apartmentNote = {idSaved: apartment.idSaved, note: note};
        setOpenNoteSnack(false)
        API.updateNote(apartmentNote).then(() => {
            setDirty2(true);
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <Grid container xs={{boxShadow: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                  ml={0} mt={2} mb={!saved && 1} pt={1} columnSpacing={{xs: 1}} onClick={() => {
                navigate('/apartments/' + apartment.idApartment)
            }}>
                <Grid item xs={5} pr={3}>
                    {saved && <Fab size='medium' sx={contactInformationStyle} aria-label="Contact" color="inherit"
                                   onClick={(event) => {
                                       event.stopPropagation();
                                       saved && setOpenContact(true);
                                   }}
                    >
                        <ContactPhoneRoundedIcon sx={{fontSize: 30, color: '#016FB9'}}/>
                    </Fab>}
                    <Box mt={!saved && 3}>
                        <img
                            src={apartment.pic1}
                            pt={4}
                            alt={"Home"}
                            loading="lazy"
                            className={"card-img-listA"}
                        />
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Box mt={1} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography style={{fontSize: "19px"}}> {apartment.title}   </Typography>
                            {saved && <Typography variant="h6"> in {apartment.nameArea} </Typography>}

                        </Box>

                        <IconButton sx={{opacity: 0.8, height: "21px"}} style={{marginRight:"-3px", marginTop: "8px"}} edge="start"
                                    color="inherit" aria-label="menu"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setOpenBoomkmarkSnack(true);
                                        if(!isSaved)
                                            setIsSaved(true);
                                        else
                                            setIsSaved(false);
                                    }}>
                            <Fab size='medium' color="inherit">
                                {saved ? <BookmarkRoundedIcon sx={{fontSize: 30, color: '#016FB9'}}/> :
                                    isSaved ?
                                        <BookmarkRoundedIcon sx={{fontSize: 30, color: '#016FB9'}}/> :
                                        <BookmarkBorderRoundedIcon sx={{fontSize: 30, color: '#016FB9'}}/>}
                            </Fab>

                        </IconButton>
                    </Box>

                    <Grid item mt={1}>
                        <Typography style={{fontSize: "15px"}}> <b> {apartment.address} </b> </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{fontSize: "15px"}}> Price/month: <b> {apartment.price} € </b> </Typography>
                    </Grid>
                    {saved && <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: "14px"}}>Area's compatibility: <b>{apartment.compatibility}%</b>
                        </Typography>

                    </Grid>}
                    {saved && addNoteButton &&
                    <Typography style={{fontSize: "15px"}}>Distance from
                        university: <b> {computeDistance(apartment, universityId)} km </b> </Typography>
                    }
                </Grid>

            </Grid>
            {
                saved && addNoteButton &&
                <>
                    <HomeIcons bathrooms={apartment.bathrooms} bedrooms={apartment.bedrooms} people={apartment.people}
                               sqmt={apartment.sqmt}></HomeIcons>
                    <Container maxWidth="sm"  style={{ display:"flex", flexDirection: 'row',justifyContent:"space-between", marginBottom:"12px", marginTop: "24px"}} >
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            margin='dense'
                            multiline={true}
                            fullWidth={true}
                            rows={1}
                            placeholder="Write a note..."
                            defaultValue={apartment.note}
                            style={{marginTop:"0px",  paddingTop:"0px", marginBottom:"0px"}}
                            onChange={(event) => setNote(event.target.value)}
                            {...props}
                        />
                        <Button style={{backgroundColor: '#DAE2E7', color: '#384B56', marginLeft:"16px",  paddingTop:"0px"}} size="small"
                                variant="outlined" onClick={() => setOpenNoteSnack(true)}>{apartment.note==null ? "SAVE" : "EDIT"}</Button>

                    </Container>
                </>
            }
            <Stack
                direction="row"
                justifyContent="end" mr={1}>
                {saved && <Button variant="text"
                                  style={{color: "#016FB9"}}
                                  onClick={() => setAddNoteButton(!addNoteButton)}
                                  endIcon={addNoteButton ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                > {addNoteButton ? "close" : "more"}</Button>}
            </Stack>

            <Snackbar   sx={{ bottom: { xs: 64, sm: 0 }}}  style={{color:"#384B56"}} open={openNoteSnack} autoHideDuration={2000} onClose={() => {
                saveNote()
            }} message={apartment.note==null? "Added note!" : "Edited note!"} action={actionNoteSnack} TransitionComponent={TransitionRight}></Snackbar>
            <Snackbar open={openBookmarkSnack} autoHideDuration={2000}  sx={{ bottom: { xs: 64, sm: 0,  } }}  TransitionComponent={TransitionRight}  onClose={() => {
                addOrRemoveFromSaved();
            }}
                      message={saved || savedList.some((element) => element.idApartment === apartment.idApartment) ? "Removed from saved!" : "Added to saved!"}
                      action={actionBookmarkSnack}></Snackbar>
            <ContactInformation owner={apartment.owner} openContact={openContact} setOpenContact={setOpenContact}/>

        </>

    )
        ;
}

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

export default ApartmentInfo;