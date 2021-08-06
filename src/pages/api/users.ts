import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import normalizeEmail from 'validator/lib/normalizeEmail';

import prisma from '../../lib/prisma';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// GET /api/users
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const allUsers = await prisma.user.findMany({
    select: {
      name: true,
      email: true
    }
  });

  res.status(201).json({
    success: true,
    data: allUsers
  });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same
  const isValidPassword = isLength(password, { min: 6, max: 20 });
  if (email && !isEmail(email)) {
    res
      .status(400)
      .json({ success: false, message: 'The email you entered is invalid.' });
    return;
  }
  if (!isValidPassword || !name) {
    res.status(400).json({ success: false, message: 'Missing field(s)' });
    return;
  }

  try {
    // check if email existed
    const existingUser = await prisma.user.findFirst({
      where: { email: 'me@jibi.dev' || '' }
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('user@123', 16);
      const newUser = await prisma.user.create({
        data: {
          name: 'Jibi John David',
          email: 'me@jibi.dev',
          password: hashedPassword
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          password: false
        }
      });

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, cat: newUser.createdAt },
        process.env.JWT_SECRET || '2Ah3Q~e::0!_L]zm/0{E*',
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRATION
        }
      );

      res.status(201).json({
        success: true,
        token: token
      });
    } else {
      res
        .status(403)
        .json({ success: false, message: 'The email has already been used.' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error
    });
  }
});

export default handler;
