import { Chip } from '@mui/material';

export default function AreaGrade(props) {
    const grade = props.grade;
    const string = grade + "/5"
    return (
        <>
            {(grade > 4) ?
                <Chip size="" label={string} sx={{ border: 2, fontSize:"15px", backgroundColor:"#99FFBB" }} variant="outlined" />
                :
                (grade < 2) ?
                    <Chip label={string} sx={{ border: 2, fontSize:"15px", backgroundColor:"#FF9999" }}  variant="outlined" />
                    :
                    <Chip label={string} sx={{ border: 2, fontSize:"15px" }} variant="outlined" />
            }
        </>
    );
}