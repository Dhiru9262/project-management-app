const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const role = req.session.role || "student"; // default role
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          const googleId = profile.id;

          let user;

          if (role === "student") {
            // ✅ Check by email instead of only googleId
            user = await Student.findOne({ email });
            if (!user) {
              user = await Student.create({ googleId, name, email });
            }
          } else if (role === "teacher") {
            user = await Teacher.findOne({ email });
            if (!user) {
              user = await Teacher.create({ googleId, name, email });
            }
          }

          done(null, { ...user.toObject(), role });
        } catch (err) {
          console.error("Google Auth Error:", err);
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
