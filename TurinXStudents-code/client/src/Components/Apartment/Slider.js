import * as React from 'react';
import {useState} from 'react';
import {Question1, Question2, Question3, Question4, Question5, Question6, Question7} from "../Questionnaire.js"
import {useTheme} from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import SearchingApartments from '../SearchingApartments'

function Slider(props){
    const {idUser, areas, setIntro, setBestAreas, setUniversityId, setDirty}=props;
    const [step, setStep] = useState(0);
    const [disable, setDisable] = useState(true);

    // go back to previous step
    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    }

    // proceed to the next step
    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    }

    return(
        <Box p={2}>
            <CurrentQuestion step={step} setDisable={setDisable} id={idUser}
                             areas={areas} setIntro={setIntro} setBestAreas={setBestAreas} setUniversityId={setUniversityId} setDirty={setDirty}/>
            {step < 7 && <Stepper step={step} nextStep={nextStep} prevStep={prevStep} disable={disable} setDisable={setDisable}/>
            }</Box>
    )
}


function CurrentQuestion(props){
    const [q1, setQ1] = useState(0);
    const [q2, setQ2] = useState(0);
    const [q3, setQ3] = useState(0);
    const [q4, setQ4] = useState(0);
    const [q5, setQ5] = useState(0);
    const [q6, setQ6] = useState(0);
    const [q7, setQ7] = useState(0);

    const {step, setDisable, id, areas, setIntro, setBestAreas, setUniversityId, setDirty } = props;
    switch (step) {
        case 0:
            return (
                <Question1 q1={q1} setQ1={setQ1} setDisable={setDisable}/>
            )
        case 1:
            return (
                <Question2 q2={q2} setQ2={setQ2} setDisable={setDisable}/>
            )
        case 2:
            return (
                <Question3 q3={q3} setQ3={setQ3} setDisable={setDisable}/>
            )
        case 3:
            return (
                <Question4 q4={q4} setQ4={setQ4} setDisable={setDisable}/>
            )
        case 4:
            return (
                <Question5 q5={q5} setQ5={setQ5} setDisable={setDisable}/>
            )
        case 5:
            return (
                <Question6 q6={q6} setQ6={setQ6} setDisable={setDisable}/>
            )
        case 6:
            return (
                <Question7 q7={q7} setQ7={setQ7} setDisable={setDisable}/>
            )
        case 7:
            let preferences = {id, q1, q2, q3, q4, q5, q6, q7};
            return (
                <SearchingApartments preferences={preferences} areas={areas} setIntro={setIntro} setBestAreas={setBestAreas} setUniversityId={setUniversityId} setDirty={setDirty}/>
            )
        default:{
            return("");
        }
    }
}

function Stepper(props) {
    const theme = useTheme();

    return(
        <MobileStepper
            variant="dots"
            steps={7}
            activeStep={props.step}
            nextButton={
                <Button size="small" onClick={props.nextStep} disabled={props.disable} >
                    {props.step === 6 ? "View Result" : "Next"}
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button size="small" onClick={props.prevStep} disabled={props.step === 0}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Back
                </Button>
            }
        />
        )
}
export {CurrentQuestion, Stepper};
export default Slider;