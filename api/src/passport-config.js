import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/userModel.js'


passport.use(
  new LocalStrategy(async (username, password, done) => {

    const enteredUsername = username.toLowerCase();
    try {
      const user = await User.findOne({ username:enteredUsername });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      // const passwordMatch = await user.isValidPassword(password);
      const passwordMatch = password == user?.password;
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (error) {

      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});


