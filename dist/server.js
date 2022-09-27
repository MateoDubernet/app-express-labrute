"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const robot_bdd_1 = require("./database/robot-bdd");
const user_1 = require("./models/user");
const arme_1 = require("./models/arme");
const bouclier_1 = require("./models/bouclier");
const tenue_1 = require("./models/tenue");
const register_1 = require("./register");
const login_1 = require("./login");
const arme_bdd_1 = require("./database/arme-bdd");
const bouclier_bdd_1 = require("./database/bouclier-bdd");
const tenue_bdd_1 = require("./database/tenue-bdd");
const app = (0, express_1.default)();
const sess = {
    secret: 'keyboard cat',
    cookie: { secure: true }
};
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use((0, express_session_1.default)(sess));
let user = new user_1.Users();
let robotBdd = new robot_bdd_1.RobotBdd();
let armeBdd = new arme_bdd_1.ArmeBdd();
let bouclierBdd = new bouclier_bdd_1.BouclierBdd();
let tenueBdd = new tenue_bdd_1.TenueBdd();
let register = new register_1.Register();
let login = new login_1.Login();
let arme = new arme_1.Arme();
let bouclier = new bouclier_1.Bouclier();
let tenue = new tenue_1.Tenue();
let robots = [];
let connectedUserRobot;
//  Moteur de template
app.set('views', './vues');
app.set('view engine', 'ejs');
//  Middleware
app.use(express_1.default.static("./assets"));
app.use(express_1.default.static("./dist"));
app.use(express_1.default.urlencoded({ extended: false }));
/* Routes */
/* METHODE GET */
app.get('/login', (request, response) => {
    register.loginAlreadyExist = false;
    register.passwordMatchError = false;
    response.render('connection', { account: true, loginNotExistError: login.loginNotExistError, wrongPassword: login.wrongLoginPassword });
});
app.get('/register', (request, response) => {
    login.loginNotExistError = false;
    login.wrongLoginPassword = false;
    response.render('connection', {
        account: false,
        loginAlreadyExist: register.loginAlreadyExist,
        passwordMatchError: register.passwordMatchError
    });
});
app.get('/home', (request, response) => {
    response.render('home', {
        connectedUser: login.currentUser,
        connectedUserRobot: connectedUserRobot,
        armes: arme.armes,
        boucliers: bouclier.boucliers,
        tenues: tenue.tenues
    });
});
app.get('/robot-list', (request, response) => {
    getRobots();
    response.render('robot-list', { connectedUser: login.currentUser, robots: robots, users: user.users });
});
app.get('/object-list', (request, response) => {
    response.render('object-list', { connectedUserRobot: connectedUserRobot, armes: arme.armes, boucliers: bouclier.boucliers, tenues: tenue.tenues });
});
/* METHODE POST */
app.post('/login', (request, response) => {
    login.login(request.body, user);
    if (!login.loginNotExistError && !login.wrongLoginPassword) {
        getRobots();
        response.redirect('/home');
    }
    else {
        response.redirect('/login');
    }
});
app.post('/register', (request, response) => {
    register.register(request, response, user);
});
app.post('/equip', (request, response) => {
    equipItems(request, response);
});
app.post('/add', (request, response) => {
    addItems(request, response);
});
app.listen(4200);
// Fonctions
function getRobots() {
    robotBdd.getAllRobots().then((data) => {
        robots = [...data];
        for (let i = 0; i < robots.length; i++) {
            if (robots[i].user_id === login.currentUser.id) {
                connectedUserRobot = robots[i];
            }
            user.users.forEach((user) => {
                if (user.id === robots[i].user_id) {
                    robots[i].user_name = user.pseudo;
                }
            });
        }
    });
}
/* Armes */
function addStatByArme(armeId) {
    arme.armes.forEach((arme) => {
        if (arme.id === armeId) {
            connectedUserRobot.puissance = connectedUserRobot.puissance + arme.puissance;
            connectedUserRobot.esquive = connectedUserRobot.esquive + arme.esquive;
        }
    });
}
function removeStatByArme(armeId) {
    arme.armes.forEach((arme) => {
        if (arme.id === armeId) {
            connectedUserRobot.puissance = connectedUserRobot.puissance - arme.puissance;
            connectedUserRobot.esquive = connectedUserRobot.esquive - arme.esquive;
        }
    });
}
/* Boucliers */
function addStatByBouclier(bouclierId) {
    bouclier.boucliers.forEach((bouclier) => {
        if (bouclier.id === bouclierId) {
            connectedUserRobot.defense = connectedUserRobot.defense + bouclier.defense;
            connectedUserRobot.esquive = connectedUserRobot.esquive + bouclier.esquive;
        }
    });
}
function removeStatByBouclier(bouclierId) {
    bouclier.boucliers.forEach((bouclier) => {
        if (bouclier.id === bouclierId) {
            connectedUserRobot.defense = connectedUserRobot.defense - bouclier.defense;
            connectedUserRobot.esquive = connectedUserRobot.esquive - bouclier.esquive;
        }
    });
}
/* Tenues */
function addStatByTenue(tenueId) {
    tenue.tenues.forEach((tenue) => {
        if (tenue.id === tenueId) {
            connectedUserRobot.pv = connectedUserRobot.pv + tenue.pv;
            connectedUserRobot.puissance = connectedUserRobot.puissance + tenue.puissance;
            connectedUserRobot.defense = connectedUserRobot.defense + tenue.defense;
        }
    });
}
function removeStatByTenue(tenueId) {
    tenue.tenues.forEach((tenue) => {
        if (tenue.id === tenueId) {
            connectedUserRobot.pv = connectedUserRobot.pv - tenue.pv;
            connectedUserRobot.puissance = connectedUserRobot.puissance - tenue.puissance;
            connectedUserRobot.defense = connectedUserRobot.defense - tenue.defense;
        }
    });
}
function equipItems(request, response) {
    var urlParams = new URLSearchParams(request.url);
    var isArme = urlParams.has('/equip?armeId');
    var isBouclier = urlParams.has('/equip?bouclierId');
    var isTenue = urlParams.has('/equip?tenueId');
    if (isArme) {
        var armeId = urlParams.get('/equip?armeId');
        if (connectedUserRobot.arme_id === null) {
            connectedUserRobot.arme_id = Number(armeId);
            addStatByArme(connectedUserRobot.arme_id);
        }
        else if (armeId !== connectedUserRobot.arme_id.toString()) {
            removeStatByArme(connectedUserRobot.arme_id);
            addStatByArme(Number(armeId));
            connectedUserRobot.arme_id = Number(armeId);
        }
        else {
            connectedUserRobot.arme_id = null;
            removeStatByArme(Number(armeId));
        }
        robotBdd.updateArmeRobots(connectedUserRobot).then((data) => { });
    }
    else if (isBouclier) {
        var bouclierId = urlParams.get('/equip?bouclierId');
        if (connectedUserRobot.bouclier_id === null) {
            connectedUserRobot.bouclier_id = Number(bouclierId);
            addStatByBouclier(connectedUserRobot.bouclier_id);
        }
        else if (bouclierId !== connectedUserRobot.bouclier_id.toString()) {
            removeStatByBouclier(connectedUserRobot.bouclier_id);
            addStatByBouclier(Number(bouclierId));
            connectedUserRobot.bouclier_id = Number(bouclierId);
        }
        else {
            connectedUserRobot.bouclier_id = null;
            removeStatByBouclier(Number(bouclierId));
        }
        robotBdd.updateBouclierRobots(connectedUserRobot).then((data) => { });
    }
    else if (isTenue) {
        var tenueId = urlParams.get('/equip?tenueId');
        if (connectedUserRobot.tenue_id === null) {
            connectedUserRobot.tenue_id = Number(tenueId);
            addStatByTenue(connectedUserRobot.tenue_id);
        }
        else if (tenueId !== connectedUserRobot.tenue_id.toString()) {
            removeStatByTenue(connectedUserRobot.tenue_id);
            addStatByTenue(Number(tenueId));
            connectedUserRobot.tenue_id = Number(tenueId);
        }
        else {
            connectedUserRobot.tenue_id = null;
            removeStatByTenue(Number(tenueId));
        }
        robotBdd.updateTenueRobots(connectedUserRobot).then((data) => { });
    }
    response.redirect('/home');
}
function addItems(request, response) {
    var urlParams = new URLSearchParams(request.url);
    var isArme = urlParams.has('/add?armeId');
    var isBouclier = urlParams.has('/add?bouclierId');
    var isTenue = urlParams.has('/add?tenueId');
    if (isArme) {
        var armeId = urlParams.get('/add?armeId');
        arme.armes.forEach((listArme) => {
            if (listArme.id === Number(armeId)) {
                arme = listArme;
            }
        });
        armeBdd.updateArme(arme);
    }
    else if (isBouclier) {
        var bouclierId = urlParams.get('/add?bouclierId');
        bouclier.boucliers.forEach((listBouclier) => {
            if (listBouclier.id === Number(bouclierId)) {
                bouclier = listBouclier;
            }
        });
        bouclierBdd.updateBouclier(bouclier);
    }
    else if (isTenue) {
        var tenueId = urlParams.get('/add?tenueId');
        tenue.tenues.forEach((listTenue) => {
            if (listTenue.id === Number(tenueId)) {
                tenue = listTenue;
            }
        });
        tenueBdd.updateTenue(tenue);
    }
    response.redirect('/home');
}
//# sourceMappingURL=server.js.map