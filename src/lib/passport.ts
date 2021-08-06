import passport from 'passport';
import passportJWT from 'passport-jwt';

import prisma from './prisma';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

export type UserTokenType = {
  id: string;
  email: string;
  cat: string;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },

    async (token: UserTokenType, done) => {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          name: true
        },
        where: {
          id: token.id,
          email: token.email,
          createdAt: token.cat
        }
      });

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    }
  )
);
