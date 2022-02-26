const express = require('express');
const router = express.Router();

/**      Auth route         */
router.use('/auth', require('./routers/auth/auth.router'));
/**      End auth route    */



module.exports = router;
