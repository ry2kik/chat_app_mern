const express = require('express');
const router = express.Router();

router.get('/send', (req, res) => {
    console.log('send');
});


module.exports = router;