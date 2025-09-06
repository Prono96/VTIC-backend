/* Dependencies */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../schema/userSchema");  

/* Passport Middleware */
passport.use(
  new GoogleStrategy(
    {
      clientID: "52043147258-gvi3m62f2qakp5ovn4sblibl1dgbceks.apps.googleusercontent.com",  // Client ID
      clientSecret: "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",  // Client secret
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (token, tokenSecret, profile, done) {
      try {
        console.log(profile);
        const [user, created] = await User.findOrCreate({
          where: {
            googleId: profile.id,
          },
          defaults: {
            // Initialize necessary fields in User model here, like this:
            first: profile.name.givenName,
            last: profile.name.familyName,
            email: profile.emails[0].value,
          },
        });
        return done(null, traveler);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* How to store the user information in the session */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

/* How to retrieve the user from the session */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* Exporting Passport Configuration */
module.exports = passport;