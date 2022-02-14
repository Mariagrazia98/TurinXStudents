import { Rating, Grid, MenuItem, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import API from '../API';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Question1(props) {
    useEffect(() => {
        props.q1 === 0 ? props.setDisable(true) : props.setDisable(false);
    }, [])
    return (
        <>
            <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '60vh', textAlign: "center" }}>
                <Grid item xs={12} class="questionTitle">
                    <h2>How much are you interested in being close to the university?</h2>
                </Grid>
                <Grid item xs={12}>
                    <img src="/images/school.svg" class="questionnaireImg" />
                </Grid>
                <Grid item xs={12}>
                    <Rating
                        style={{ textAlign: "center", fontSize: 50 }}
                        value={props.q1}
                        onChange={(event, newValue) => {
                            props.setQ1(newValue);
                            newValue === null ? props.setDisable(true) : props.setDisable(false);
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );

}

function Question2(props) {
    useEffect(() => {
        props.q2 === 0 ? props.setDisable(true) : props.setDisable(false);
    }, [])

    return (
        <>
            <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '60vh', textAlign: "center" }}>
                <Grid item xs={12} class="questionTitle">
                    <h2>How much are you interested in public transport?</h2>
                </Grid>
                <Grid item xs={12}>
                    <img src="/images/bus.svg" class="questionnaireImg" />
                </Grid>
                <Grid item xs={12}>
                    <Rating
                        style={{ textAlign: "center", fontSize: 50 }}
                        value={props.q2}
                        onChange={(event, newValue) => {
                            props.setQ2(newValue);
                            newValue === null ? props.setDisable(true) : props.setDisable(false);
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );

}

function Question3(props) {
    useEffect(() => {
        props.q3 === 0 ? props.setDisable(true) : props.setDisable(false);
    }, [])

    return (<>
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh', textAlign: "center" }}>
            <Grid item xs={12} class="questionTitle">
                <h2>How much are you interested in shopping?</h2>
            </Grid>
            <Grid item xs={12}>
                <img style={{maxWidth: "200px", minWidth: "200px"}} src="/images/shopping.jpg" class="questionnaireImg" />
            </Grid>
            <Grid item xs={12}>
                <Rating
                    style={{ textAlign: "center", fontSize: 50 }}
                    value={props.q3}
                    onChange={(event, newValue) => {
                        props.setQ3(newValue);
                        newValue === null ? props.setDisable(true) : props.setDisable(false);
                    }}
                />
            </Grid>
        </Grid>
    </>);
}

function Question4(props) {
    useEffect(() => {
        props.q4 === 0 ? props.setDisable(true) : props.setDisable(false);
    }, [])

    return (<>
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh', textAlign: "center" }}>
            <Grid item xs={12} class="questionTitle">
                <h2>How much are you interested in green areas?</h2>
            </Grid>
            <Grid item xs={12}>
                <img src="/images/fountain.svg" class="questionnaireImg" />
            </Grid>
            <Grid item xs={12}>
                <Rating
                    style={{ textAlign: "center", fontSize: 50 }}
                    value={props.q4}
                    onChange={(event, newValue) => {
                        props.setQ4(newValue);
                        newValue === null ? props.setDisable(true) : props.setDisable(false);
                    }}
                />
            </Grid>
        </Grid>
    </>);
}

function Question5(props) {
    useEffect(() => {
        props.q5 === 0 ? props.setDisable(true) : props.setDisable(false);
    }, [])

    return (<>
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh', textAlign: "center" }}>
            <Grid item xs={12} class="questionTitle">
                <h2>How much are you interested in night-life?</h2>
            </Grid>
            <Grid item xs={12}>
                <img src="/images/waiter.svg" class="questionnaireImg" />
            </Grid>
            <Grid item xs={12}>
                <Rating
                    style={{ textAlign: "center", fontSize: 50 }}
                    value={props.q5}
                    onChange={(event, newValue) => {
                        props.setQ5(newValue);
                        newValue === null ? props.setDisable(true) : props.setDisable(false);
                    }}
                />
            </Grid>
        </Grid>
    </>);
}

function Question6(props) {
    useEffect(() => {
        props.q6 === 0 ? props.setDisable(true) : props.setDisable(false);
    }, [])

    return (<>
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh', textAlign: "center" }}>
            <Grid item xs={12} class="questionTitle">
                <h2>How much are you interested in safety?</h2>
            </Grid>
            <Grid item xs={12}>
                <img src="/images/police.svg" class="questionnaireImg" />
            </Grid>
            <Grid item xs={12}>
                <Rating
                    style={{ textAlign: "center", fontSize: 50 }}
                    value={props.q6}
                    onChange={(event, newValue) => {
                        props.setQ6(newValue);
                        newValue === 0 ? props.setDisable(true) : props.setDisable(false);
                        newValue === null ? props.setDisable(true) : props.setDisable(false);
                    }}
                />
            </Grid>
        </Grid>
    </>);
}

function Question7(props) {
    useEffect(() => {
        props.q7 === 0 ? props.setDisable(true) : props.setDisable(false);
        API.getUniversities().then((u) => {

            setUniversities(u);
            setDirty(false);
            setUniversity(props.q7);
        })
    }, [])

    const [university, setUniversity] = useState('');
    const [universities, setUniversities] = useState('');
    const [dirty, setDirty] = useState(true);
    const handleChange = (event) => {
        props.setQ7(event.target.value)
        setUniversity(event.target.value);
        props.setDisable(false);
    };


    return(
        <>
            <Grid container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: '55vh', textAlign: "center" }}>
                <Grid item xs={12} class="questionTitle">
                    <h2>Where do you attend lectures?</h2>
                </Grid>
                <Grid item xs={12}>
                    <img style={{maxWidth: "200px", minWidth: "200px", marginBottom:"2rem"}} src="/images/university.jpg" class="" />
                </Grid>
            </Grid>
            {!dirty &&
            <Container sx={{ maxWidth: 250, marginTop: "-50px" }}
                 alignItems="center"
                 justifyContent="center"
                 style={{ textAlign: "center" }}>
                <FormControl fullWidth style={{ textAlign: "center" }}>
                    <InputLabel id="select-label-university" >University</InputLabel>
                    <Select
                        labelId="select-label-university"
                        id="select"
                        value={university}
                        label="University"
                        onChange={handleChange}
                    >
                        <MenuItem value={universities[0].id}>{universities[0].name}</MenuItem>
                        <MenuItem value={universities[1].id}>{universities[1].name}</MenuItem>
                        <MenuItem value={universities[2].id}>{universities[2].name}</MenuItem>
                    </Select>
                </FormControl>
            </Container> }
        </>

    )
}

export {
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    Question6,
    Question7
};

