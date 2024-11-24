let router=require('express').Router()
const categorieCtrl = require('../controllers/catgctrl')


router.post('/ajoutcatg',categorieCtrl.ajoutcatg)
router.get('/categorie/:id',categorieCtrl.getcategorieById)
router.get('/categorie',categorieCtrl.getAllcat)
router.get('/nomcategorie',categorieCtrl.getcategorieByNom)
router.get('/typecategorie',categorieCtrl.getcategorieByType)
router.put('/updatecatg',categorieCtrl.updatenomCategorie)
router.delete('/delettype',categorieCtrl.supprimtype)

module.exports=router