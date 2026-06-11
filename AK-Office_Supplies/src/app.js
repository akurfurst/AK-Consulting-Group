import express from 'express';
import session from 'express-session';
import defaultRouter from './routers/ak.office.routes.js';
import cartRouter from './routers/cart.routes.js';   

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 }
}));

//routers
app.use("/", defaultRouter);
app.use('/api/cart', cartRouter);

export default app;