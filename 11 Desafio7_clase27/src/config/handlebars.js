import handlebars from 'express-handlebars';
import {__dirname} from '../utils.js';

const setupHandlebars = (app) => {
    try {
        app.engine("handlebars", handlebars.engine());
        app.set("views", `${__dirname}/views`);
        app.set("view engine", "handlebars");        
    } catch (error) {
        console.log(`Error en handlebars.js: ${error}`)
    }
};

export default setupHandlebars;