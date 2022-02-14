import { useNavigate } from 'react-router-dom';
import API from '../API';
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function findBestAreas(p, areas, distances){
    let ranking = []; //contains final rank
    let best = []; //ranking without compatibility
    let partialBest = []; //containts best areas for each rank
    let totalBest = [];
    let counter = [0,0,0,0,0,0];
    let tmp = [];

    let questions = [p.q2, p.q3, p.q4, p.q5, p.q6];
    if(distances != null){
        //x : distance = 5 : 6500  => convert into 1-5
        distances.map( d => {
            let t = d.distance*5/6500;
            d.distance = (Math.round(t) === 0) ? 1 :  Math.round(t);
            switch(d.distance) {
                case 1 :
                    d.distance = 5;
                    break;
                case 2 :
                    d.distance = 4;
                    break;
                case 4 :
                    d.distance = 2;
                    break;
                case 5 :
                    d.distance = 1;
                    break;
                default:
                    break;
            }
        })

        tmp = distances.sort((a, b) => b.distance - a.distance).slice(0,3);
        tmp.map(t => totalBest.push({id: t.idArea}))
        tmp = [];
    }

        questions.map((q, index) => {
            tmp = [...areas];
            switch (index) {
                case 0 :
                    partialBest = tmp.sort((a, b) => {
                        const distanceA = Math.abs(a.public_transport - q)
                        const distanceB = Math.abs(b.public_transport - q)
                        if (distanceA === distanceB) {
                            return a - b
                        }
                        return distanceA - distanceB
                    }).slice(0, 3).sort((a, b) => a - b);
                    totalBest = totalBest.concat(partialBest);
                    break;
                case 1 :
                    partialBest = tmp.sort((a, b) => {
                        const distanceA = Math.abs(a.shopping - q)
                        const distanceB = Math.abs(b.shopping - q)
                        if (distanceA === distanceB) {
                            return a - b
                        }
                        return distanceA - distanceB
                    }).slice(0, 3).sort((a, b) => a - b);
                    totalBest = totalBest.concat(partialBest);
                    break;
                case 2 :
                    partialBest = tmp.sort((a, b) => {
                        const distanceA = Math.abs(a.green_areas - q)
                        const distanceB = Math.abs(b.green_areas - q)
                        if (distanceA === distanceB) {
                            return a - b
                        }
                        return distanceA - distanceB
                    }).slice(0, 3).sort((a, b) => a - b);
                    totalBest = totalBest.concat(partialBest);
                    break;
                case 3 :
                    partialBest = tmp.sort((a, b) => {
                        const distanceA = Math.abs(a.night_life - q)
                        const distanceB = Math.abs(b.night_life - q)
                        if (distanceA === distanceB) {
                            return a - b
                        }
                        return distanceA - distanceB
                    }).slice(0, 3).sort((a, b) => a - b);
                    totalBest = totalBest.concat(partialBest);
                    break;
                case 4 :
                    partialBest = tmp.sort((a, b) => {
                        const distanceA = Math.abs(a.safety - q)
                        const distanceB = Math.abs(b.safety - q)
                        if (distanceA === distanceB) {
                            return a - b
                        }
                        return distanceA - distanceB
                    }).slice(0, 3).sort((a, b) => a - b);
                    totalBest = totalBest.concat(partialBest);
                    break;
                default:
                    break;
            }
        })
        totalBest.map(area => {
            counter[area.id] += 1;
        })

        for (let i = 0; i < 3; i++) {
            let index = counter.indexOf(Math.max(...counter));
            counter[index] = 0;
            best.push(index);
        }

//compatibility
    let total;
    let distanceValue;
    if(distances != null){
        best.map(areaId => {
            distances.map(d => {
                if(d.idArea === areaId)
                    distanceValue = d.distance;
            })
            areas.map(a => {
                if(a.id === areaId){
                    total = Math.abs(distanceValue- p.q1) + Math.abs(a.public_transport - p.q2) + Math.abs(a.shopping - p.q3) +  Math.abs(a.green_areas - p.q4) + Math.abs(a.night_life - p.q5) + Math.abs(a.safety - p.q6);

                    //total : 24 = x : 100 => convert into %
                    total = 100 - Math.round(total * 100 / 24);
                    ranking.push({area_id: areaId, user_id: p.id, compatibility: total});
                }
            })
        });
    }else{
        best.map(areaId => {
            areas.map(a => {
                if(a.id === areaId){
                    total = Math.abs(a.public_transport - p.q2) + Math.abs(a.shopping - p.q3) +  Math.abs(a.green_areas - p.q4) + Math.abs(a.night_life - p.q5) + Math.abs(a.safety - p.q6);
                    //total : 20 = x : 100 => convert into %
                    total = 100 - Math.round(total * 100 / 20);
                    ranking.push({area_id: areaId, user_id: p.id, compatibility: total});
                }

            })
        });
    }
    ranking.sort((a, b) => b.compatibility - a.compatibility);
    return ranking;
}


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};


function SearchingApartments(props){
    const navigate = useNavigate();
    const {preferences, areas, setIntro, setBestAreas, setUniversityId, setDirty} = props;
    const [progress, setProgress] = useState(0);

    useEffect(()=>{
        API.updatePreferences(preferences).then(() => {});
        let UserAreas;
        if(preferences.q1 > 2){ //user interested in distance from university
            API.getDistancesByUniversity(preferences.q7).then((distances) =>{
                UserAreas = findBestAreas(preferences, areas, distances);
                UserAreas.map (a => {
                    API.addUserAreas(a);
                })
            })
        }else{
            UserAreas = findBestAreas(preferences, areas);
            UserAreas.map (a => {
                API.addUserAreas(a);
            })
        }

        setTimeout(() => {
            // After 10 seconds set the intro false and go to areas
            setBestAreas(UserAreas);
            setUniversityId(preferences.q7);
            setIntro(false);
            setDirty(true);
            navigate('/areas');
        }, 4500)
    },[])

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress > 100 ? 20 : prevProgress + 20));
        }, 880);
        return () => {
            clearInterval(timer);
        };
    }, []);


    return(
        <Box container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '80vh', textAlign: "center" }}
              >
            <Grid item xs={12} class="questionTitle" style={{marginTop: "74px"}}>
                <Typography variant="h5" px={2} align={"center"}>
                    We are searching the best solutions for you!
                </Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop: "-25px"}} >
                <Box sx={{display: 'flex' , justifyContent: 'center'}}>
                    <img src="/images/animation.gif" alt={"Searching apartment"}/>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <LinearProgressWithLabel value={progress} />
            </Grid>
        </Box>
    );
}

export default SearchingApartments;