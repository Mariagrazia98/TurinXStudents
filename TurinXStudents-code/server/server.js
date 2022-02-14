'use strict';

const express = require('express');
const morgan = require('morgan');

const dao = require('./dao'); // module for accessing the DB

// init express
const app = new express();
const port = 3001;

/* Set-up the middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static("./client/build"));

/* Get all reviews*/
app.get('/api/reviews',
    (req, res) => {
        dao.reviews()
            .then((reviews) => res.status(200).json(reviews))
            .catch(() => res.status(500).json({ error: `Database error during the loading of reviews`}));
    }
);

/* Get all the preferences*/
app.get('/api/preferences',
    (req, res) => {
        dao.preferences()
            .then((preferences) => res.status(200).json(preferences))
            .catch(() => res.status(500).json({ error: `Database error during the loading of preferences`}));
    }
);

/* Modify preferences */
app.put('/api/preferences', async (req, res) => {
    try {
        await dao.updatePreferences(req.body);
        res.status(201).end();
    } catch(err) {
        console.log(err);
        res.status(503).json({error: `Database error during the addiction of preferences`});
    }
});

/* Modify actual user */
app.put('/api/actualUser/:userId', async (req, res) => {
    try {
        await dao.updateActualUser(req.params.userId);
        res.status(201).end();
    } catch(err) {
        console.log(err);
        res.status(503).json({error: `Database error during the addiction of preferences`});
    }
});

/* Modify actual user to noone*/
app.put('/api/actualUser', async (req, res) => {
    try {
        await dao.updateActualUsers();
        res.status(201).end();
    } catch(err) {
        console.log(err);
        res.status(503).json({error: `Database error during the addiction of preferences`});
    }
});

/* Get all the apartments*/
app.get('/api/apartments',
    (req, res) => {
        dao.apartments()
            .then((apartments) => res.status(200).json(apartments))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartments`}));
    }
);

/* Get an apartment identified by idApartment */
app.get('/api/apartment/:idApartment',
    (req, res) => {
        dao.apartment(req.params.idApartment)
            .then((apartment) => res.status(200).json(apartment))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartment`}));
    }
);

/* Get an apartment identified by idApartment */
app.get('/api/areas/:idArea',
    (req, res) => {
        dao.areaInformation(req.params.idArea)
            .then((apartment) => res.status(200).json(apartment))
            .catch(() => res.status(500).json({ error: `Database error during the getting of area information`}));
    }
);
/* Get all the areas*/
app.get('/api/areas',
    (req, res) => {
        dao.areas()
            .then((areas) => res.status(200).json(areas))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartments`}));
    }
);

/* Get all the universities*/
app.get('/api/universities',
    (req, res) => {
        dao.universities()
            .then((universities) => res.status(200).json(universities))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartments`}));
    }
);

/* Get all the apartments in a certain area */
app.get('/api/apartments/:idArea',
    (req, res) => {
        dao.apartmentsByArea(req.params.idArea)
            .then((apartments) => res.status(200).json(apartments))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartments`}));
    }
);

/* Get all the distances fron areas in a certain university */
app.get('/api/distances/:idUniversity',
    (req, res) => {
        dao.distancesByUniversity(req.params.idUniversity)
            .then((distances) => res.status(200).json(distances))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartments`}));
    }
);
/* Get saved list*/
app.get('/api/saved/:idUser',
    (req, res) => {
        dao.saved(req.params.idUser)
            .then((saved) => res.status(200).json(saved))
            .catch(() => res.status(500).json({ error: `Database error during the loading of saved`}));
    }
);

/* Get all the owners*/
app.get('/api/owners',
    (req, res) => {
        dao.owners()
            .then((owners) => res.status(200).json(owners))
            .catch(() => res.status(500).json({ error: `Database error during the loading of owners`}));
    }
);

/* POST a new saved apartment */
app.post('/api/addtosaved', async (req, res) => {
    try {
      await dao.addToSaved(req.body.apartmentId, req.body.userId);
      res.status(201).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the creation of new saved apartment`});
    }
});

/* DELETE from saved an apartment */
app.delete('/api/removefromsaved', async (req, res) => {
    try {
      await dao.removeFromSaved(req.body.apartmentId, req.body.userId);
      res.status(204).end();
    } catch(err) {
      res.status(503).json({ error: `Database error during the deletion of saved apartment ${req.body.apartmentId}.`});
    }
});

/* POST a new saved apartment */
app.post('/api/updatenote', async (req, res) => {
    try {
        console.log(req.body)
        await dao.updateApartmentNote(req.body);
        res.status(201).end();
    } catch(err) {
        console(err)
        res.status(503).json({error: `Database error during the creation of new saved apartment`});
    }
});

/* POST a new user areas compatibility */
app.post('/api/userAreas', async (req, res) => {
    try {
        await dao.addUserAreas(req.body);
        res.status(201).end();
    } catch(err) {
        console.log(err)
        res.status(503).json({error: `Database error during the creation of new saved apartment`});
    }
});

/* Get all the apartments in a certain area */
app.get('/api/userAreas/:userId',
    (req, res) => {
        dao.getUserAreas(req.params.userId)
            .then((userAreas) => res.status(200).json(userAreas))
            .catch(() => res.status(500).json({ error: `Database error during the loading of apartments`}));
    }
);


/* DELETE from saved an apartment */
app.delete('/api/userAreas/:user_id', async (req, res) => {
    try {
        await dao.removeUserAreas(req.params.user_id);
        res.status(204).end();
    } catch(err) {
        res.status(503).json({ error: `Database error during the deletion of saved apartment ${req.body.apartmentId}.`});
    }
});

/* Get actual user*/
app.get('/api/actualUser',
    (req, res) => {
        dao.actualUser()
            .then((actualUser) => res.status(200).json(actualUser))
            .catch(() => res.status(500).json({ error: `Database error during the loading of preferences`}));
    }
);

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});