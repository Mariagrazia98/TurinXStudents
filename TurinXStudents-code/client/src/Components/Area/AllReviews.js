import { Box, Typography, List } from '@mui/material';
import BarChart from './Utilities/BarChart';
import ReviewLine from './Utilities/ReviewLine';


export default function AllReviews(props) {

    const users = [
        { name: "Antonio", rating: 2, age: 22 },
        { name: "Martina", rating: 3, age: 20 },
        { name: "Giulia", rating: 1, age: 27 },
        { name: "Maria", rating: 5, age: 30 },
        { name: "Sofia", rating: 4, age: 22 },
        { name: "Corrado", rating: 1, age: 24 },
        { name: "Massimo", rating: 3, age: 21 },
        { name: "Fabio", rating: 4, age: 23 },
        { name: "Laura", rating: 4, age: 28 },
        { name: "Giovanni", rating: 1, age: 28 },
        { name: "Serena", rating: 5, age: 32 },
        { name: "Cosimo", rating: 2, age: 19 }
    ];

    return (
        <Box class="" style={{padding:"2rem", paddingTop:"1rem", paddingBottom:"4rem", backgroundColor:"#DAE2E7"}}>
            <Typography align="center" sx={{ m: 0}} style={{ fontSize: "22px" }} component="div">
                Users's reviews
            </Typography>
            <BarChart areaName={"Cenisia"} />
            <List class="reviewList" dense={true}>
                {users.map((u, index) =>
                    <ReviewLine key={"all-" + index + "-review-line"} name={u.name} age={u.age}  rating={u.rating} />
                )}
            </List>
        </Box>
    );
}