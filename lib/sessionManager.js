import session from 'express-session';
import MongoStore from 'connect-mongo';
import User from '../models/User.js';
import 'dotenv/config';

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

export const middleware = session({
    name: 'nodeapp-session',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true, // crear una sesión vacia a cada usuario
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNSTR 
    })
})

/* export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
} */

export async function useSessionInViews(req, res, next) {
  res.locals.session = req.session;
    res.locals.user = null;

  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    res.locals.user = user;
  }

  next();
}

export function guard(req, res, next) {
    if (!req.session.userId) {
        res.redirect(`/auth/login?redir=${req.url}`);
        return;
    }
    next();
}