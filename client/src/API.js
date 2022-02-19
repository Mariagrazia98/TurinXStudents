const BASEURL = '/api';

function getJson(httpResponsePromise) {
    return new Promise((resolve, reject) => {
        httpResponsePromise
            .then((response) => {
                if (response.ok) {

                    // always return {} from server, never null or non json, otherwise it will fail
                    response.json()
                        .then( json => resolve(json) )
                        .catch( err => reject({ error: "Cannot parse server response" }))

                } else {
                    // analyze the cause of error
                    response.json()
                        .then(obj => reject(obj)) // error msg in the response body
                        .catch(err => reject({ error: response.statusText}))
                }
            })
            .catch(err => reject({ error: "Cannot communicate with server"  })) // connection error
    });
}

async function getReviews() {
    return getJson(
        fetch(BASEURL + '/reviews')
    )
}

async function getAreas() {
    return getJson(
        fetch(BASEURL + '/areas')
    )
}

async function getPreferences() {
    return getJson(
        fetch(BASEURL + '/preferences')
    )
}

async function getApartments() {
    return getJson(
        fetch(BASEURL + '/apartments')
    )
}

async function getApartmentById(apartmentId) {
    return getJson(
        fetch(BASEURL + '/apartment/'+apartmentId)
    )
}

async function getApartmentsByArea(areaId) {
    return getJson(
        fetch(BASEURL + '/apartments/'+areaId)
    )
}


async function getSaved(idUser) {
    return getJson(
        fetch(BASEURL + '/saved/'+idUser)
    )
}

async function getOwners() {
    return getJson(
        fetch(BASEURL + '/owners')
    )
}

function addToSaved(toBeAdded) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/addtosaved', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toBeAdded),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

function removeFromSaved(toBeRemoved) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/removefromsaved', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toBeRemoved),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

function updateNote(apartmentNote) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/updatenote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apartmentNote),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

function updatePreferences(preferences) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/preferences', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferences),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function getUniversities() {
    return getJson(
        fetch(BASEURL + '/universities')
    )
}

async function getDistancesByUniversity(universityId) {
    return getJson(
        fetch(BASEURL + '/distances/'+ universityId)
    )
}

function addUserAreas(areaCompatibility) {
    return new Promise((resolve, reject) => {
        console.log(areaCompatibility)
        fetch(BASEURL + '/userAreas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(areaCompatibility),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function getUserAreas(userId) {
    return getJson(
        fetch(BASEURL + '/userAreas/'+userId)
    )
}

async function getAreaByID(idArea) {
    return getJson(
        fetch(BASEURL + '/areas/'+idArea)
    )
}

function removeUserAreas(user_id) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/userAreas/' +user_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

function updateActualUser(userId) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/actualUser/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

function updateActualUsers() {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/actualUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function getActualUser() {
    return getJson(
        fetch(BASEURL + '/actualUser')
    )
}

const API = {
    getReviews,
    getPreferences,
    updatePreferences,
    getApartments,
    getApartmentById,
    getApartmentsByArea,
    getSaved,
    getOwners,
    addToSaved,
    removeFromSaved,
    updateNote,
    getAreas,
    getUniversities,
    getDistancesByUniversity,
    addUserAreas,
    getUserAreas,
    getAreaByID,
    removeUserAreas,
    updateActualUser,
    updateActualUsers,
    getActualUser
}
export default API;