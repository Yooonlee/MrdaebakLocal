"use strict";

const User = require("../../models/User");

const output = {
    home : (req,res)=>{
        res.render("home/index");
    },
    homeCook : (req,res)=>{
        res.render("home/homeCook");
    },
    homeDelivery : (req,res)=>{
        res.render("home/homeDelivery");
    },
    
    login : (req,res)=>{
        res.render("home/login");
    },
    register : (req,res)=>{
        res.render("home/register");
    }
}


const process = {
    login : async (req,res)=>{
        const user = new User(req.body);
        const response = await user.login();
        console.log(response);
        return res.json(response);
   },
   register : async (req,res)=>{
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
},

};

module.exports = {
    output,
    process,
};