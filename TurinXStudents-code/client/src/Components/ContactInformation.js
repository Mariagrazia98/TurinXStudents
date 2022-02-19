import {Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';

function ContactInformation(props){
    const {owner, openContact, setOpenContact}=props;

    return (<Dialog open={openContact} onClose={() => {setOpenContact(false)}}>
        <DialogTitle align="center">Contact owner</DialogTitle>
        <Typography variant="h6" align="center"> <b>{owner.name} {owner.surname}</b> </Typography>
        <List sx={{ pt: 0 }}>
            <ListItem autoFocus button>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#DAE2E7', color: '#016FB9' }}>
                        <EmailRoundedIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={owner.email}/>
            </ListItem>
            <ListItem autoFocus button>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#DAE2E7', color: '#016FB9' }}>
                        <PhoneRoundedIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={owner.phone}/>
            </ListItem>
        </List>
    </Dialog>
)}

export default ContactInformation;