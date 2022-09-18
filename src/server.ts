import express, { Request, Response } from "express";
import session from "express-session";

import { RobotBdd }  from './database/robot-bdd'

import { Users } from './models/user'
import { Robots } from './models/robot'
import { Arme } from './models/arme';
import { Bouclier } from "./models/bouclier";
import { Tenue } from "./models/tenue";
import { Register } from "./register";
import { Login } from "./login";

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

let user = new Users();

let robotBdd = new RobotBdd();
let register = new Register();
let login = new Login();

let arme = new Arme();
let bouclier = new Bouclier();
let tenue = new Tenue();
let robots: Robots[] = [];

let connectedUserRobot: Robots

//  Moteur de template
app.set('views', './vues');
app.set('view engine', 'ejs');

//  Middleware
app.use(express.static("./assets"))
app.use(express.static("./dist"))
app.use(express.urlencoded({extended: false}))

/* Routes */

/* METHODE GET */
app.get('/login', (request: Request, response: Response) =>{
    register.loginAlreadyExist = false
    register.passwordMatchError = false
    response.render('connection', { account: true, loginNotExistError: login.loginNotExistError, wrongPassword: login.wrongLoginPassword})
})

app.get('/register', (request: Request, response: Response) =>{
    login.loginNotExistError = false
    login.wrongLoginPassword = false
    response.render('connection', { 
        account: false, 
        loginAlreadyExist: register.loginAlreadyExist, 
        passwordMatchError: register.passwordMatchError})
})

app.get('/home', (request: Request, response: Response) =>{

    response.render('home', {
        connectedUser: login.currentUser, 
        connectedUserRobot: connectedUserRobot,
        armes: arme.armes,
        boucliers: bouclier.boucliers,
        tenues: tenue.tenues
    })
})

app.get('/robot-list', (request: Request, response: Response) =>{
    getRobots()
    response.render('robot-list', {connectedUser: login.currentUser, robots: robots, users: user.users})
})

app.get('/object-list', (request: Request, response: Response) =>{
    response.render('object-list', {connectedUserRobot: connectedUserRobot, armes: arme.armes, boucliers: bouclier.boucliers, tenues: tenue.tenues})
})

/* METHODE POST */
app.post('/login', (request: Request, response: Response) =>{
    login.login(request.body, user)
    if (!login.loginNotExistError && !login.wrongLoginPassword) {
        getRobots()
        response.redirect('/home')
    }else{
        response.redirect('/login')
    }
})

app.post('/register', (request: Request, response: Response) =>{
    register.register(request, response, user)
})

app.post('/equip', (request: Request, response: Response) =>{    
    equipItems(request, response)
})

app.listen(4200)

/* FONCTIONS */
function getRobots(){
    robotBdd.getAllRobots().then((data: Robots[]) => {
        robots = [...data]

        arme.armes.forEach((item) => {
            item.robot_id = connectedUserRobot.id;
        })

        bouclier.boucliers.forEach((item) => {
            item.robot_id = connectedUserRobot.id;
        })

        tenue.tenues.forEach((item) => {
            item.robot_id = connectedUserRobot.id;
        })
        
        for (let i = 0; i < robots.length; i++) {
            if (robots[i].user_id === login.currentUser.id) {
                connectedUserRobot = robots[i]
            }

            user.users.forEach((user) => {
                if (user.id === robots[i].user_id) {
                    robots[i].user_name = user.pseudo
                }
            });
        }
    })
}

/* Armes */
function addStatByArme(armeId: number){
    arme.armes.forEach((arme) => {
        if (arme.id === armeId) {
                connectedUserRobot.puissance = connectedUserRobot.puissance + arme.puissance
                connectedUserRobot.esquive = connectedUserRobot.esquive + arme.esquive
        }
    })
}

function removeStatByArme(armeId: number){
    arme.armes.forEach((arme) => {
        if (arme.id === armeId) {
                connectedUserRobot.puissance = connectedUserRobot.puissance - arme.puissance
                connectedUserRobot.esquive = connectedUserRobot.esquive - arme.esquive
        }
    })
}

/* Boucliers */
function addStatByBouclier(bouclierId: number){
    bouclier.boucliers.forEach((bouclier) => {
        if (bouclier.id === bouclierId) {
                connectedUserRobot.defense = connectedUserRobot.defense + bouclier.defense
                connectedUserRobot.esquive = connectedUserRobot.esquive + bouclier.esquive
        }
    })
}

function removeStatByBouclier(bouclierId: number){
    bouclier.boucliers.forEach((bouclier) => {
        if (bouclier.id === bouclierId) {
                connectedUserRobot.defense = connectedUserRobot.defense - bouclier.defense
                connectedUserRobot.esquive = connectedUserRobot.esquive - bouclier.esquive
        }
    })
}

/* Tenues */
function addStatByTenue(tenueId: number){
    tenue.tenues.forEach((tenue) => {
        if (tenue.id === tenueId) {
            connectedUserRobot.pv = connectedUserRobot.pv + tenue.pv
            connectedUserRobot.puissance = connectedUserRobot.puissance + tenue.puissance
            connectedUserRobot.defense = connectedUserRobot.defense + tenue.defense
        }
    })
}

function removeStatByTenue(tenueId: number){
    tenue.tenues.forEach((tenue) => {
        if (tenue.id === tenueId) {
                connectedUserRobot.pv = connectedUserRobot.pv - tenue.pv
                connectedUserRobot.puissance = connectedUserRobot.puissance - tenue.puissance
                connectedUserRobot.defense = connectedUserRobot.defense - tenue.defense
        }
    })
}

function equipItems(request: Request, response: Response){
    var urlParams = new URLSearchParams(request.url)

    var isArme = urlParams.has('/equip?armeId')
    var isBouclier = urlParams.has('/equip?bouclierId')
    var isTenue = urlParams.has('/equip?tenueId')

    if (isArme) {
        var armeId = urlParams.get('/equip?armeId')

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
        var bouclierId = urlParams.get('/equip?bouclierId')

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
        var tenueId = urlParams.get('/equip?tenueId');

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