import express, { Request, Response } from "express";
import session from "express-session";

import { UserBdd }  from './database/user-bdd'
import { RobotBdd }  from './database/robot-bdd'
import { ArmeBdd } from './database/arme-bdd';
import { BouclierBdd } from './database/bouclier-bdd';
import { TenueBdd } from './database/tenue-bdd';

import { Users } from './models/user'
import { Robots } from './models/robot'
import { Arme } from './models/arme';
import { Bouclier } from "./models/bouclier";
import { Tenue } from "./models/tenue";

const app = express();
const sess = {
    secret: 'keyboard cat',
    cookie: {secure: true}
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(sess))

let userBdd = new UserBdd();
let robotBdd = new RobotBdd();

let armeBdd = new ArmeBdd();
let bouclierBdd = new BouclierBdd();
let tenueBdd = new TenueBdd();

let users: Users[] = [];
let robots: Robots[] = [];

let armes: Arme[] = [];
let boucliers: Bouclier[] = [];
let tenues: Tenue[] = [];

let connectedUser: Users;
let connectedUserRobot: Robots

let loginAlreadyExist: boolean
let passwordMatchError: boolean;

let loginNotExistError: boolean
let wrongLoginPassword: boolean;

//  Moteur de template
app.set('views', './vues');
app.set('view engine', 'ejs');

//  Middleware
app.use(express.static("./assets"))
app.use(express.static("./dist"))
app.use(express.urlencoded({extended: false}))

//  Routes

/* METHODE GET */
app.get('/login', (request: Request, response: Response) =>{
    getUsers()
    loginAlreadyExist = false
    passwordMatchError = false
    response.render('connection', { account: true, loginNotExistError: loginNotExistError, wrongPassword: wrongLoginPassword})
})

app.get('/register', (request: Request, response: Response) =>{
    getUsers()
    loginNotExistError = false
    wrongLoginPassword = false
    response.render('connection', { account: false, loginAlreadyExist, passwordMatchError})
})

app.get('/home', (request: Request, response: Response) =>{
    response.render('home', {
        connectedUser: connectedUser, 
        connectedUserRobot: connectedUserRobot,
        armes: armes,
        boucliers: boucliers,
        tenues: tenues
    })
})

app.get('/robot-list', (request: Request, response: Response) =>{
    getRobots()
    response.render('robot-list', {connectedUser: connectedUser, robots: robots, users: users})
})

app.get('/object-list', (request: Request, response: Response) =>{
    response.render('object-list', {armes, boucliers, tenues})
})

/* METHODE POST */
app.post('/login', (request: Request, response: Response) =>{
    login(request.body, response)
})

app.post('/register', (request: Request, response: Response) =>{
    register(request.body, response)
})

app.post('/home', (request: Request, response: Response) =>{    
    equipItems(request, response)
})
/*REGARDER CE QUE C'EST QUE EXPRESS SESSION ET COOKIE SESSION POUR GESTION DE SESSION*/
app.listen(4200)

// Fonctions
function getUsers(){
    userBdd.getAllUsers().then((data: Users[]) => {
        users = [...data]
    }).catch(err => {
        throw new Error(err.message)
    })
}

function getRobots(){
    robotBdd.getAllRobots().then((data: Robots[]) => {
        robots = [...data]
        
        for (let i = 0; i < robots.length; i++) {
            if (robots[i].user_id === connectedUser.id) {
                connectedUserRobot = robots[i]
            }

            users.forEach((user) => {
                if (user.id === robots[i].user_id) {
                    robots[i].user_name = user.pseudo
                }
            });
        }
    })
}

function getObjets(){
    armeBdd.getAllArmes().then((data: Arme[]) => {
        armes = [...data]
    });

    bouclierBdd.getAllBoucliers().then((data: Bouclier[]) => {
        boucliers = [...data]
    });

    tenueBdd.getAllTenues().then((data: Tenue[]) => {
        tenues = [...data]
    });
}

function register(userData: Users, response: Response) {

    const foundLogin = users.find(user => user.login === userData.login)

    if (foundLogin) {
        loginAlreadyExist = true
    }else{
        loginAlreadyExist = false
    }

    if (userData.password === userData.verifyPassword) {
        passwordMatchError = false;
    }else{
        passwordMatchError = true;
    }

    if (users.length === 0) {
        userData.id = 0;
    }
    else {
        users.forEach((user) => {
            userData.id = user.id + 1;
        });
    }
    
    if(!loginAlreadyExist && !passwordMatchError){
        userBdd.addUsers(userData).then((data: Users[]) => { 
            response.redirect('/login')
        }).catch(err => {
            throw new Error(err.message)
        })
    }else{
        response.redirect('/register')
    }
}

function login(userData: Users, response: Response){
    
    const foundLogin = users.find(user => user.login === userData.login)
    wrongLoginPassword = false
    connectedUser = foundLogin

    if (foundLogin) {
        loginNotExistError = false

        if (foundLogin.password === userData.password) {
            wrongLoginPassword = false
        }else{
            wrongLoginPassword = true
        }
    }else{
        loginNotExistError = true
    }

    if (!loginNotExistError && !wrongLoginPassword) {
        getRobots()
        getObjets()
        response.redirect('/home')
    }else{
        response.redirect('/login')
    }
}

/* Armes */
function addStatByArme(armeId: number){
    armes.forEach((arme) => {
        if (arme.id === armeId) {
                connectedUserRobot.puissance = connectedUserRobot.puissance + arme.puissance
                connectedUserRobot.esquive = connectedUserRobot.esquive + arme.esquive
        }
    })
}

function removeStatByArme(armeId: number){
    armes.forEach((arme) => {
        if (arme.id === armeId) {
                connectedUserRobot.puissance = connectedUserRobot.puissance - arme.puissance
                connectedUserRobot.esquive = connectedUserRobot.esquive - arme.esquive
        }
    })
}

/* Boucliers */
function addStatByBouclier(bouclierId: number){
    boucliers.forEach((bouclier) => {
        if (bouclier.id === bouclierId) {
                connectedUserRobot.defense = connectedUserRobot.defense + bouclier.defense
                connectedUserRobot.esquive = connectedUserRobot.esquive + bouclier.esquive
        }
    })
}

function removeStatByBouclier(bouclierId: number){
    boucliers.forEach((bouclier) => {
        if (bouclier.id === bouclierId) {
                connectedUserRobot.defense = connectedUserRobot.defense - bouclier.defense
                connectedUserRobot.esquive = connectedUserRobot.esquive - bouclier.esquive
        }
    })
}

/* Tenues */
function addStatByTenue(tenueId: number){
    tenues.forEach((tenue) => {
        if (tenue.id === tenueId) {
            connectedUserRobot.pv = connectedUserRobot.pv + tenue.pv
            connectedUserRobot.puissance = connectedUserRobot.puissance + tenue.puissance
            connectedUserRobot.defense = connectedUserRobot.defense + tenue.defense
        }
    })
}

function removeStatByTenue(tenueId: number){
    tenues.forEach((tenue) => {
        if (tenue.id === tenueId) {
                connectedUserRobot.pv = connectedUserRobot.pv - tenue.pv
                connectedUserRobot.puissance = connectedUserRobot.puissance - tenue.puissance
                connectedUserRobot.defense = connectedUserRobot.defense - tenue.defense
        }
    })
}

function equipItems(request: Request, response: Response){
    var urlParams = new URLSearchParams(request.url)

    var isArme = urlParams.has('/home?armeId')
    var isBouclier = urlParams.has('/home?bouclierId')
    var isTenue = urlParams.has('/home?tenueId')

    if (isArme) {
        var armeId = urlParams.get('/home?armeId')

        if (connectedUserRobot.arme_id === null) {
            connectedUserRobot.arme_id = Number(armeId)
            addStatByArme(connectedUserRobot.arme_id)

        }else if (armeId !== connectedUserRobot.arme_id.toString()) {
            removeStatByArme(connectedUserRobot.arme_id)
            addStatByArme(Number(armeId))
            connectedUserRobot.arme_id = Number(armeId)
        }else{
            connectedUserRobot.arme_id = null
            removeStatByArme(Number(armeId))
        }

        robotBdd.updateArmeRobots(connectedUserRobot).then((data: Robots[]) => {})

    }else if (isBouclier) {
        var bouclierId = urlParams.get('/home?bouclierId')

        if (connectedUserRobot.bouclier_id === null) {
            connectedUserRobot.bouclier_id = Number(bouclierId)
            addStatByBouclier(connectedUserRobot.bouclier_id)

        }else if (bouclierId !== connectedUserRobot.bouclier_id.toString()) {
            removeStatByBouclier(connectedUserRobot.bouclier_id)
            addStatByBouclier(Number(bouclierId))
            connectedUserRobot.bouclier_id = Number(bouclierId)
        }else{
            connectedUserRobot.bouclier_id = null
            removeStatByBouclier(Number(bouclierId))
        }

        robotBdd.updateBouclierRobots(connectedUserRobot).then((data: Robots[]) => {})

    }else if (isTenue) {
        var tenueId = urlParams.get('/home?tenueId');

        if (connectedUserRobot.tenue_id === null) {
            connectedUserRobot.tenue_id = Number(tenueId)
            addStatByTenue(connectedUserRobot.tenue_id)

        }else if (tenueId !== connectedUserRobot.tenue_id.toString()) {
            removeStatByTenue(connectedUserRobot.tenue_id)
            addStatByTenue(Number(tenueId))
            connectedUserRobot.tenue_id = Number(tenueId)
        }else{
            connectedUserRobot.tenue_id = null
            removeStatByTenue(Number(tenueId))
        }
        
        robotBdd.updateTenueRobots(connectedUserRobot).then((data: Robots[]) => {})
    }
    response.redirect('/home')
}

