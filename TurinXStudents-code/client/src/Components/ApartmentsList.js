import {useEffect, useState} from 'react';
import {MapContainer, Marker, TileLayer, Tooltip} from 'react-leaflet'
import {Box, Paper, Typography,} from '@mui/material';
import ApartmentInfo from './Apartment/ApartmentInfo';
import '../../node_modules/leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
import API from './../API';
import {useParams} from "react-router-dom";


export default function ApartmentsList(props) {
    const {addToSaved, removeFromSaved, idUser, savedList} = props;
    const [apartments, setApartments] = useState([]);
    const [posizione, setPosizione] = useState();
    const [loading, setLoading] = useState(true);
    const [area, setArea] = useState([]); //TODO TO UPDATE
    const [timer,setTimer]=useState(false);
    const [apartmentHighlight,setApartmentHighlight]=useState();
    const idArea = useParams().idArea;
    const apartmentIcon = new L.Icon({
        iconUrl:"/images/location.png",
        iconRetinaUrl: "/images/location.png",
        popupAnchor: [-0, -0],
        iconSize: [50, 50],
    });


    useEffect(() => {
        API.getAreaByID(idArea).then((areaInformation) => {
            setArea(areaInformation)
            setPosizione([areaInformation.coordinateX, areaInformation.coordinateY])
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })

        API.getApartmentsByArea(idArea).then((apartments) => {
            setApartments(apartments);
            props.setShowBackArrow(true);
        }).catch(err => {
            console.log(err)
        })


    }, [])

    // On componentDidMount set the timer
    useEffect(() => {
        if (timer) {
            const timeId = setTimeout(() => {
                // After 5 seconds set the show value to false
                setApartmentHighlight();
                setTimer(false);
            }, 5000)
            return () => {
                clearTimeout(timeId)
            }
        }
    }, [apartmentHighlight, setApartmentHighlight, timer, setTimer])

    return (
        <>
            {
                !loading &&
                <>
                    <Box class="map">
                        <MapContainer style={{"height": "25em"}} center={posizione} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {apartments && apartments.length >= 0 && apartments.map((apartment) => (
                                <Marker position={[apartment.coordinateX, apartment.coordinateY]} eventHandlers={{
                                    click: (a) => {
                                        const index = apartments.findIndex(a => a.idApartment === apartment.idApartment);
                                        let data = apartments.map((x) => x);
                                        let tmp = data[0];
                                        data[0] = data[index];
                                        data[index] = tmp;
                                        setApartments(data);
                                        setApartmentHighlight(0);
                                        setTimer(true);
                                    }
                                }}
                                        icon={apartmentIcon}>
                                    <Tooltip>
                                        {apartment.title} {apartment.price} €
                                    </Tooltip>
                                </Marker>
                            ))}

                        </MapContainer>
                    </Box>
                    <Typography align="center" sx={{mt: 2, mb:1}} variant="h5" component="div">
                        Apartments in {area.name}
                    </Typography>
                    <Box sx={{flexGrow: 1}} mb={8} ml={2} mr={2}>
                        {apartments && apartments.length >= 0 && apartments.map((apartment,index) => (
                            <Paper square={false} elevation={5} mr={0} style={(timer && apartmentHighlight===index)? {backgroundColor:"#DAE2E7"} : {}}>
                            <ApartmentInfo key={apartment.id} apartment={apartment} saved={false}
                                           removeFromSaved={removeFromSaved} addToSaved={addToSaved}
                                           savedList={savedList} idUser={idUser}/>
                            </Paper>
                        ))}
                    </Box>
                </>}
        </>

    );
}

