let router=require('express').Router()
let AdminCtrl=require('../controllers/AdminCtrl')

router.post('/login', AdminCtrl.login)
router.get('/logout',AdminCtrl.logout)

module.exports=router