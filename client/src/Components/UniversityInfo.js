const poli = {x: 45.062438755702985, y: 7.662376060202287};
const einaudi = {x: 45.07364781279697, y: 7.6993552540697765};
const palazzo = {x: 45.06808712754069, y: 7.694365569412544};
const uni = [poli, einaudi, palazzo];

function computeDistance (apartment,idUniversity) {
    let selectedUni = uni[idUniversity-1];
    let d = Math.sqrt((apartment.coordinateX-selectedUni.x)**2 + (apartment.coordinateY-selectedUni.y)**2)*100; //in km
    return d.toFixed(1);

}
export default computeDistance;