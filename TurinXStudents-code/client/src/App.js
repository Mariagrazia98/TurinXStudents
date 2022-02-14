import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Slider from './Components/Slider';
import Intro from './Components/Intro';
import Users from './Components/Users';
import ApartmentScreen from './Components/ApartmentScreen';
import ApartmentsList from "./Components/ApartmentsList";
import ButtonAppBar from './Components/MyAppBar';
import SimpleBottomNavigation from './Components/MyBottomNavigation';
import { useEffect, useState } from 'react';
import AreasScreen from './Components/Area/AreasScreen';
import AllReviews from './Components/Area/AllReviews';
import SavedApartments from './Components/ApartmentsSaved';
import API from './API';

function App() {
    ///setted in area screen
    const [idArea, setIdArea] = useState(0);
    const [areas, setAreas] = useState([]);
    const [bestAreas, setBestAreas] = useState([]);
    const [areasGot, setAreasGot] = useState(false);
    const [universityId, setUniversityId] = useState(1); //1: poli, 2: einaudi, 3: palazzoNuovo

    const [intro, setIntro] = useState(true);
    const [preferences, setPreferences] = useState([]);
    const [savedList, setSavedList] = useState([]);
    const [dirty, setDirty] = useState(true);
    const [dirty2, setDirty2] = useState(true);
    const [showBackArrow, setShowBackArrow] = useState(false);
    const [idUser, setIdUser] = useState(1); //current user
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.getActualUser().then((user) => {
            setIdUser(user[0].id);
            setUniversityId(user[0].q7);
            API.getUserAreas(user[0].id).then((areas)=>{
                setBestAreas(areas)
                setLoading(false);
                setIntro(false);
            })
        }).catch((err)=>console.log(err));
    }, [])

    useEffect(() => {
        if (!areasGot) {
            API.getAreas().then((areas) => {
                areas.map(a => a.polygon = JSON.parse(a.polygon).cc)
                areas.map(a => a.infos = JSON.parse(a.infos))
                setAreas(areas);
                setAreasGot(true);
            }).catch((err)=>console.log(err));
        }
    }, [areasGot])

    useEffect(() => {
        API.getPreferences().then((preferences) => {
            setPreferences(preferences);
            setDirty(false);
        }).catch((err)=>console.log(err));
    }, [dirty])

    useEffect(() => {
        API.getSaved(idUser).then((savedList) => {
            setSavedList(savedList);
            setDirty2(false);
        }).catch((err)=>console.log(err));
    }, [dirty2, idUser])

    const addToSaved = async (apartmentToSave) => {
        API.addToSaved(apartmentToSave).catch((err)=>{console.log(err)});
        setDirty2(true);
    }

    const removeFromSaved = (apartmentToRemove) => {
        API.removeFromSaved(apartmentToRemove).catch((err)=>{console.log(err)});
        setDirty2(true);
    }

    return (
        <>
            <Router>
                <ButtonAppBar setShowBackArrow={setShowBackArrow} setIntro={setIntro} intro={intro} idUser={idUser} showBackArrow={showBackArrow} setShowBackArrow={setShowBackArrow} setIdArea={setIdArea}/>
                <Routes>
                    <Route exact path="/areas" element={<AreasScreen setIntro={setIntro} loading={loading} setLoading={setLoading} universityId={universityId} bestAreas={bestAreas} setIdArea={setIdArea} idArea={idArea} totAreas={areas} setShowBackArrow={setShowBackArrow}/>} />
                    <Route path="/reviews/Cenisia" element={<AllReviews />} />
                    <Route exact path="/areas/:idArea/apartments"
                        element={<ApartmentsList savedList={savedList} addToSaved={addToSaved}
                            removeFromSaved={removeFromSaved} idUser={idUser} setShowBackArrow={setShowBackArrow}/>}/>
                    <Route path="/apartments/:id" element={
                        <ApartmentScreen savedList={savedList} addToSaved={addToSaved} removeFromSaved={removeFromSaved} idUser={idUser} setShowBackArrow={setShowBackArrow} universityId={universityId}/>} />
                    <Route exact path="/questionnaire" element={<Slider idUser={idUser} areas={areas} setIntro={setIntro} setBestAreas={setBestAreas} setUniversityId={setUniversityId} setDirty={setDirty}/>} />
                    <Route exact path="/saved" element={<SavedApartments savedList={savedList} addToSaved={addToSaved}
                        removeFromSaved={removeFromSaved}
                        idUser={idUser} setShowBackArrow={setShowBackArrow} setDirty2={setDirty2}  universityId={universityId} />}   />
                    <Route exact path="/intro" element={<Intro/>} />
                    <Route path="/" element={<Users setIdUser={setIdUser} preferences={preferences} setIntro={setIntro} setBestAreas={setBestAreas} setUniversityId={setUniversityId}/>} />
                </Routes>
                <SimpleBottomNavigation intro={intro} setIntro={setIntro} setShowBackArrow={setShowBackArrow}/>
            </Router>
        </>
    );
}

export default App;