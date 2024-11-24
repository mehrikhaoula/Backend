let router=require('express').Router()
let userCtrl=require('../controllers/userCtrl')
//router.post('/user',userCtrl.add)
//router.post('/division',userCtrl.Division)  // ki nesta3mlou 2 post lazem nbadlou /nom 
//router.post('/multipl',userCtrl.Mul)

router.post('/inscrit',userCtrl.inscrit)
router.get('/users',userCtrl.allUser)
// /:id seulement dans params
router.get('/user/:id',userCtrl.getUserById)
router.post('/user',userCtrl.getUserId)
router.delete('/user/:id',userCtrl.supprimUser)
router.put('/user',userCtrl.updateUser)
router.put('/updatePassword',userCtrl.updatePassword)


module.exports=router