import {Fab} from '@mui/material';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';

export function BookmarkButton(props) {
    
      const fabStyle = {
        bgcolor: '',
        position: 'absolute',
        top: 65,
        right: 8,
        zIndex: 2,
      };
    
      const fab = [
        {
          color: 'inherit',
          sx: fabStyle,
          icon: <BookmarkRoundedIcon sx={{fontSize: 50, color: '#016FB9'/*color: '#1976d2'*/}}/>,
          label: 'Unsave',
        },
        {
          color: 'inherit',
          sx: fabStyle,
          icon: <BookmarkBorderRoundedIcon sx={{fontSize: 50, color: '#016FB9'}}/>,
          label: 'Save',
        },
      ];
    
    return(
        <Fab sx={fab[0].sx} aria-label={fab[0].label} color={fab[0].color} 
            onClick={() => {
            props.setOpenSnack(true);
            if (!props.isSaved) {
                props.setIsSaved(true);
            }
            else {
                props.setIsSaved(false);
            }
            }}>
            {props.isSaved ? fab[0].icon : fab[1].icon}
        </Fab>
    );
}


export function ContactButton(props) {
    const fabStyle = {
        bgcolor: '',
        position: 'absolute',
        top: 65,
        left: 8,
        zIndex: 2,
      };
    
      const fab = [
        {
          color: 'inherit',
          sx: fabStyle,
          icon: <ContactPhoneRoundedIcon sx={{fontSize: 40, color: '#016FB9' /*color: '#1976d2'*/}}/>,
          label: 'Contact',
        }
      ];
    
    return(
        <Fab sx={fab[0].sx} aria-label={fab[0].label} color={fab[0].color} onClick={() => {props.setOpenContact(true);}}>
            {fab[0].icon}
        </Fab>
    );
}