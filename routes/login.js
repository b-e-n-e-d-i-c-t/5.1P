const express = require("express")
const router = express.Router()
const passport = require('../passport');
jwt = require('jsonwebtoken');
const fs = require('fs').promises
const path = require('path')

router.get('/', (req, res) =>{
    res.render('./index')
})

router.post('/', async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (!user) {
        return res.status(401).send(info);
      }
  
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
  
        const body = { username: user.username };
        const token = jwt.sign(body, 'secret');
        const filePath = path.join(__dirname, '..', 'fakeToken.json');
        await fs.writeFile(filePath, JSON.stringify({ Authorization: `Bearer ${token}` }), (err) => {
        if (err) {
            console.error(err);
        throw err;
    }
        }
      );

        return res.json({ token });
      });
    })(req, res, next);
  });

module.exports = router
