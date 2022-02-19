import { ListItemText, Typography, ListItem, ListItemButton } from '@mui/material';
import IconContainerRating from './IconContainerRating';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

export default function ReviewLine(props) {
    return (
        <>
            <ListItem class="singleReview">
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid container>
                            <Grid item xs={6}>
                                <ListItemText
                                    primary={<Typography class="review">{props.name + ", " + props.age + " y.o"}</Typography>}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <ListItemButton sx={{ p: 0 }}>
                                    <IconContainerRating value={props.rating} />
                                </ListItemButton>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                        <Typography style={{ fontStyle: 'italic', fontSize: "13px" }}>
                            {props.text ?
                                props.text
                                :
                                "Puoi esprimere un feedback sul prodotto selezionando una valutazione in stelle. ... Vai alla pagina dei dettagli del prodotto. Se si tratta di un articolo che hai ordinato, puoi anche andare alla pagina I miei ordini. Clicca su Scrivi una recensione nella sezione dedicata alle recensioni, in fondo alla pagina."
                            }
                        </Typography>
                    </AccordionDetails >
                </Accordion>
            </ListItem>
        </>
    )
}

/*

Antonio: "I didn't really enjoy my time staying in this area, I love running but I haven't found a nice place to do it close to my apartment! I must say though that the area was really well served by public transport."
Martina: "It's a nice place to live but every time I had to go shopping I had to go far away from home."
Giulia: "Terrible experience, I hated this place there's nothing to do here."
Maria: "I had the best time in this place, everything I needed a quiet place and I found it!"
Sofia: "Overall a good experience, I enjoyed my time here!"

*/