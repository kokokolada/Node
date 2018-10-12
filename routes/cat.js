const fs = require('fs');

module.exports = {
    addCatPage: (req, res) => {
        res.render('add-cat.ejs', {
            title: "Kitty Register | Add a new cat"
            ,message: ''
        });
    },
    addCat: (req, res) => {

        let message = '';
        let name = req.body.name;
        let gender = req.body.gender;
        let age = req.body.age;
        let breed = req.body.breed;
        
        // send the cat's details to the database
        let query = "INSERT INTO `cats` (name, gender, age, breed) VALUES ('" +
        name + "', '" + gender + "', '" + age + "', '" + breed + "')";

        db.query(query, (err, result) => {
            
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
            });

    },

    editCatPage: (req, res) => {
        let catID = req.params.id;
        console.log(req.params.id);
        let query = "SELECT * FROM `cats` WHERE cat_id = '" + catID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-cat.ejs', {
                title: "Edit cat"
                ,cat: result[0]
                ,message: ''
            });
        });
    },
    editCat: (req, res) => {
        let catID = req.params.id;
        let name = req.body.name;
        let gender = req.body.gender;
        let age = req.body.age;
        let breed = req.body.breed;

        let query = "UPDATE `cats` SET `name` = '" + name + "', `gender` = '" + gender + "', `age` = '" + age + "', `breed` = '" + breed + "' WHERE `cat_id` = '" + catID + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteCat: (req, res) => {
        let catID = req.params.id;
        let deleteUserQuery = 'DELETE FROM cats WHERE cat_id = "' + catID + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
                    res.redirect('/');
                });
        
    }
};
