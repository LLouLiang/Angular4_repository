const express = require('express');
const router = express.Router();

// exposed CRUD methods
// Register
router.get('/Loging-Page',(req,res,next) => {
    res.send("it works");
});

module.exports = router;