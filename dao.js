"use strict";
const db = require('./db');



// get all reviews
exports.reviews = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM reviews';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

// get all preferences
exports.preferences = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, user, questionnaire, q1, q2, q3, q4, q5, q6, q7 FROM preferences';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

//save preferences
exports.updatePreferences = (preferences) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE preferences SET questionnaire=?, q1=?, q2=?, q3=?, q4=?, q5=?, q6=?, q7=? WHERE id=?';
        db.run(sql, [1, preferences.q1, preferences.q2, preferences.q3, preferences.q4, preferences.q5, preferences.q6, preferences.q7, preferences.id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

// get all apartments
exports.apartments = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, address, bathrooms, bedrooms, people, sqmt, description, owner_id, price, id_area, distance_university, pic1, pic2, pic3, pic4, pic5, coordinateX, coordinateY FROM apartments';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

//get the apartment identified by {idApartment}
exports.apartment = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT apartments.id as idApartment, title, address, bathrooms, bedrooms, people, sqmt, description, owner_id, price, id_area, areas.name as area_name, distance_university, apartments.coordinateX, apartments.coordinateY, pic1, pic2, pic3, pic4, pic5, owners.name, surname, email, phone
            FROM apartments, owners, areas
            WHERE idApartment=? AND owners.id=apartments.owner_id AND areas.id=apartments.id_area`;
        db.get(sql, [id], (err, row) => {
            if(err){
                reject(err);
                return;
            }
            if(row == undefined){
                resolve({error: 'Apartment not found.'});
            } else {
                const apartment = {
                    idApartment:row.idApartment,
                    title:row.title,
                    address:row.address,
                    bathrooms:row.bathrooms,
                    bedrooms:row.bedrooms,
                    people:row.people,
                    sqmt:row.sqmt,
                    description:row.description,
                    owner_id:row.owner_id,
                    price:row.price,
                    id_area:row.id_area,
                    area_name:row.area_name,
                    distance_university:row.distance_university,
                    coordinateX:row.coordinateX,
                    coordinateY:row.coordinateY,
                    pic1:row.pic1,
                    pic2:row.pic2,
                    pic3:row.pic3,
                    pic4:row.pic4,
                    pic5:row.pic5,
                    owner:{id:row.owner_id, name:row.name, surname:row.surname, email:row.email, phone:row.phone}
                };
                resolve(apartment);
            }
        });
    });
};

// get all areas
exports.areas = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name, public_transport, green_areas, night_life, safety, shopping, polygon, infos FROM areas';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

// get all areas
exports.areaInformation = (idArea) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name, public_transport, green_areas, night_life, safety, shopping, polygon, infos, coordinateX, coordinateY FROM areas WHERE id=?';
        db.get(sql, [idArea], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

// get all apartments in a certain area
exports.apartmentsByArea = (idArea) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT apartments.id as idApartment, title, address, price, pic1, distance_university, apartments.coordinateX, apartments.coordinateY , owners.name , surname,email,phone, areas.name as nameArea
            FROM apartments  , owners , areas 
            WHERE id_area=? AND owners.id=apartments.owner_id AND areas.id=apartments.id_area`;
        db.all(sql, [idArea], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const apartments=rows.map((row)=>({
                idApartment:row.idApartment,
                address:row.address,
                title:row.title,
                addresss:row.address,
                price:row.price,
                distance_university:row.distance_university,
                pic1:row.pic1,
                coordinateX:row.coordinateX,
                coordinateY:row.coordinateY,
                nameArea:row.nameArea,
                owner:{name:row.name, surname:row.sunrname, email:row.email,phone:row.phone}
            }));

            resolve(apartments);
        });
    });
};

// get saved list
exports.saved = (idUser) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT s.id as idSaved, a.id as idApartment, a.title, a.address, a.bathrooms, a.bedrooms, a.people, a.sqmt, a.id_area, a.price, a.pic1, a.coordinateX, a.coordinateY, s.note, distance_university, owners.name,surname,email,phone, areas.name as nameArea, user_areas.compatibility
            FROM saved s, apartments a, owners, areas, user_areas
            WHERE s.id_apartment=a.id AND s.id_user=? AND owners.id=a.owner_id AND areas.id=a.id_area AND user_areas.user_id=? AND areas.id=user_areas.area_id`;
        db.all(sql, [idUser,idUser], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const apartments=rows.map((row)=>({
                idSaved:row.idSaved,
                idApartment:row.idApartment,
                address:row.address,
                title:row.title,
                bathrooms:row.bathrooms,
                bedrooms:row.bedrooms,
                people:row.people,
                price:row.price,
                sqmt:row.sqmt,
                distance_university:row.distance_university,
                id_area:row.id_area,
                nameArea:row.nameArea,
                pic1:row.pic1,
                coordinateX:row.coordinateX,
                coordinateY:row.coordinateY,
                note:row.note,
                owner:{name:row.name, surname:row.sunrname, email:row.email,phone:row.phone},
                compatibility:row.compatibility
            }));
            resolve(apartments);
        });
    });
};

// get all owners
exports.owners = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name, surname, email, phone FROM owners';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

//save an apartment
exports.addToSaved = (apartmentId, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO saved(id_apartment, id_user) VALUES(?, ?)';
        db.run(sql, [apartmentId, userId], function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(this.lastID);
        });
    });
};

//remove an apartment from saved
exports.removeFromSaved = (apartmentId, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM saved WHERE id_apartment=? AND id_user=?';
      db.run(sql, [apartmentId, userId], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve(null);
      });
    });
}

exports.updateApartmentNote = (apartmentNote) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE saved SET note=? WHERE id=?';
        db.run(sql, [apartmentNote.note,apartmentNote.idSaved], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

// get all universities
exports.universities = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name FROM universities';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

// get all distances from areas in a certain university
exports.distancesByUniversity = (idUniversity) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT distances.area_id as idArea, distance
            FROM distances
            WHERE university_id=?`;
            db.all(sql, [idUniversity], (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(rows);
            });
    });
};

//save an apartment
exports.addUserAreas = (areaCompatibility) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user_areas(user_id, area_id, compatibility) VALUES(?, ?, ?)';
        db.run(sql, [areaCompatibility.user_id, areaCompatibility.area_id, areaCompatibility.compatibility], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// get all apartments in a certain area
exports.getUserAreas = (userId) => {
    console.log(userId)
    return new Promise((resolve, reject) => {
        const sql = `SELECT user_id, area_id, compatibility FROM user_areas WHERE user_id=?`;
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

//remove user areas
exports.removeUserAreas = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM user_areas WHERE user_id=?';
        db.run(sql, [userId], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve(null);
        });
    });
}

exports.updateActualUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE preferences SET isActual=? WHERE id=?';
        db.run(sql, [1, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

exports.updateActualUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE preferences SET isActual=?';
        db.run(sql, [0], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

exports.actualUser = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM preferences where isActual=?';
        db.all(sql, [1], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};