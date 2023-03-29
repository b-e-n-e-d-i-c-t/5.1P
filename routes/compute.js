const express = require('express')
const router = express.Router()
jwt = require('jsonwebtoken');

router.get('/addition', (req,res) => {
    const x = Number(req.query.x)
    const y = Number(req.query.y)
    result = x+y
    res.json({result})
})

module.exports = router