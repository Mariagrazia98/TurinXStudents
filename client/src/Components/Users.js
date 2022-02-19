import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {useNavigate} from 'react-router-dom';
import API from '../API';

export default function Users(props) {
    const navigate = useNavigate();

    const handleClick = (preference) => {
        props.setIdUser(preference.id);
        API.updateActualUsers().then(() =>{
            API.updateActualUser(preference.id);
        })

        if (preference.questionnaire) {
            API.getUserAreas(preference.id).then(areas=>{
                props.setIntro(false);
                props.setBestAreas(areas);
                props.setUniversityId(preference.q7);
                navigate('/areas');
            })
        } else {
            navigate('/intro');
        }
    }

    return (
        <Box sx={{p:2}}>
            {
                props.preferences.map((preference) => {
                    return (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            key={preference.id}
                        >
                            <br />
                            <CardActionArea sx={{ maxWidth: 400, border: 1, borderColor: 'grey.500', borderRadius: 2 }} onClick={() => handleClick(preference)}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        User {preference.id}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {preference.user}
                                    </Typography>
                                    {preference.questionnaire ?
                                        <Typography variant="body2">
                                            Questionnaire done
                                        </Typography> : ""}
                                </CardContent>
                            </CardActionArea>

                        </Grid>
                    )
                })
            }
        </Box>
    );
}