import * as React from 'react';
import {useEffect} from 'react';
import {AppBar, Box, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {Link, useNavigate} from "react-router-dom";
import API from '.././API';

export default function ButtonAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();


    useEffect(() => {
        if (props.intro === true)
            props.setShowBackArrow(false);
    }, [props.intro, props]);


    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleBackSurvey = () => {
        setAnchorEl(null);
        API.removeUserAreas(props.idUser);
        props.setIdArea(0);
        props.setIntro(true);
        navigate('/intro');
    };

    const handleBackUsers = () => {
        props.setIdArea(0);
        props.setIntro(true);
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center">
                        <Grid item xs={1} >
                            {props.showBackArrow ?
                                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => {
                                    navigate(-1);
                                    props.setShowBackArrow(false);
                                }}>
                                    <ArrowBackRoundedIcon/>
                                </IconButton> : null}
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1, marginLeft:2}}
                                        align="center"> TurinXStudents </Typography>
                        </Grid>

                        <Grid item xs={1} style={{paddingRight: "50px"}}>
                            {!props.intro &&

                            <IconButton size="large" color="inherit" aria-label="menu" id="basic-button"
                                        aria-controls="basic-menu" aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined} onClick={handleClickMenu}>
                                <MoreVertRoundedIcon style={{marginLeft: "16px", marginBottom: "4px"}}/>
                            </IconButton>
                            }
                        </Grid>

                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleCloseMenu}
                              MenuListProps={{'aria-labelledby': 'basic-button'}}>
                            <MenuItem onClick={handleBackSurvey}>Redo questionnaire</MenuItem>
                            <MenuItem component={Link} to="/" onClick={handleBackUsers}>Users</MenuItem>
                        </Menu>

                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
