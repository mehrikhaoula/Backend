let router=require('express').Router()
let userCtrl=require('../controllers/userCtrl')
let Authentication= require('../middleware/Auth')

//router.post('/user',userCtrl.add)
//router.post('/division',userCtrl.Division)  // ki nesta3mlou 2 post lazem nbadlou /nom 
//router.post('/multipl',userCtrl.Mul)

router.post('/inscrit',userCtrl.inscrit)
router.get('/users', userCtrl.allUser)
// /:id seulement dans params
router.get('/user/:id',userCtrl.getUserById)
router.post('/user',userCtrl.getUserId)
router.delete('/user/:id',Authentication.auth, (req, res) => {
    res.json({});}, userCtrl.supprimUser)
router.put('/user',userCtrl.updateUser)
router.put('/updatePassword',userCtrl.updatePassword)

router.use(Authentication.auth);
router.get('/admin/settings', (req, res) => {
    res.json({ message: 'Paramètres admin', adminId: req.admin });
});

module.exports=router