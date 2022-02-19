import * as React from 'react';
import {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationAction, Box, Paper} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import {Link, useLocation} from "react-router-dom";

export default function SimpleBottomNavigation(props) {
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/"){
      props.setIntro(true);
    }
    if(props.intro === true)
      setValue(0);
  }, [props.intro, props, location.pathname]);

  return (
    <>
      {(props && props.intro === false) ?
        <Box sx={{ width: 500 }}>
          <Paper sx={{ zIndex:"100",position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation  showLabels value={value} onChange={(event, newValue) => { setValue(newValue); props.setShowBackArrow(false); }}>
             <BottomNavigationAction component={Link} to="/areas" label={<span className="bottomNavLabel">Home</span>} icon={<HomeRoundedIcon style={{fontSize:"32px"}}/>} />
             <BottomNavigationAction component={Link} to="/saved" label={<span className="bottomNavLabel">Saved</span>} icon={<BookmarkRoundedIcon style={{fontSize:"30px"}}/>} />
            </BottomNavigation>
          </Paper>
        </Box>
        :
        <></>
      }
    </>
  );
}
