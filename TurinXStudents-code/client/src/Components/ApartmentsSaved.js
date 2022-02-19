import {Box, Paper, Typography} from '@mui/material';
import ApartmentInfo from './ApartmentInfo';


export default function ApartmentsSaved(props) {
    const {savedList, removeFromSaved, idUser, setShowBackArrow,universityId,setDirty2 } = props;

    setShowBackArrow(false);

    return (
        <>
            <Typography variant="h5" m={2} align={"center"}>
                Saved apartments
            </Typography>
            {savedList.length === 0 ?
                <>
                    <Box sx={{display: 'flex' , justifyContent: 'center'}} mt={5}  ml={1} mr={1}>
                        <img src="/images/anxiety.png"  style={{width:"40%", maxWidth: "200px", minWidth: "200px"}}/>

                    </Box>
                    <Typography align="center" variant="h6" component="div" mt={3} style={{color: '#016FB9'}}>
                        No saved apartements
                    </Typography>
                    <Typography align="center" component="div" style={{color:"#384B56", fontSize:"17px"}} >
                        When you like an apartment, click on the boomark symbol to save it !
                    </Typography>
                </>

                :
                <Box sx={{flexGrow: 1}} mb={8} ml={1} mr={1}>
                    {savedList.map((apartment) => (
                        <Paper square={false} elevation={5} mr={0}>
                        <ApartmentInfo key={apartment.id} apartment={apartment} saved={true}
                                       removeFromSaved={removeFromSaved} idUser={idUser} universityId={universityId} setDirty2={setDirty2}/>
                        </Paper>
                    ))}
                </Box>
            }

        </>
    );
}

