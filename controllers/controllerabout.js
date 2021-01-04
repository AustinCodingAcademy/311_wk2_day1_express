const express = require('express')
const {users} = require('../state');
let currentUserCount = users.length;

//functions



    //GET functions


    const list = (req,res) => {
        res.json(users);
    }

    //Commented them all out, as getById does all of this

    // const list1 = (req,res) => {
    //     res.json(users[0]);
    // }
    // const list2 = (req,res) => {
    //     res.json(users[1]);
    // }
    // const list3 = (req,res) => {
    //     res.json(users[2]);
    // }
    // const list4 = (req,res) => {
    //     res.json(users[3]);
    // }
    // const list5 = (req,res) => {
    //     res.json(users[4]);
    // }
    // const list6 = (req,res) => {
    //     res.json(users[5]);
    // }

    //Get by ID
    
    const getById = (req, res) => {
        let id = req.params.userId - 1
        res.json(users[id])
    }



    //post functions


    //Commented this out to allow the improved body-parser POST to have access to the /about route

    // const postNewUser = (req, res) => {
    //     let newUser = {
    //         "_id": 6,
    //         "name": "Eagle Spiegel",
    //         "occupation": "Likeable fellow",
    //         "avatar": "https://i.redd.it/olalacmmjpu31.jpg"
    //     }
    //     users.push(newUser)
    //     res.json(users)
    // }

    const postNewUser = (req, res) => {
        let newUser = req.body;
        newUser._id = currentUserCount + 1;
        users.push(newUser);
        res.json(users)
    }



    //put functions


    //Commented out as a better function has been built below "putById"

    // const put1 = (req, res) => {


    //     users[0].name = "Bingus";
    //     users[0].occupation = "Do-gooder";
    //     users[0].avatar = "https://www.facebook.com/zuck"

    //     res.json(users[0])
    // }


    const putById = (req, res) => {
        let id = req.params.userId - 1;

        users[id].name = req.body.name
        users[id].occupation = req.body.occupation
        users[id].avatar = req.body.avatar

        res.json(users)
    }

    //delete functions

    const delete1 = (req, res) => {
        users.splice(0, 1)
        res.json(users)
    }

    const deleteById = (req, res) => {
        let id= req.params.userId - 1;

        users[id].isActive = false;
        res.json(`User${id} deleted`)
    }


//exports

module.exports = {
    list, 
    // list1, list2, list3, list4, list5, list6, put1,
    delete1, postNewUser, getById, putById, deleteById}


