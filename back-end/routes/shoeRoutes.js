const express = require('express')
const router = express.Router()
const shoesController = require('../controllers/shoesController')
const keycloak = require('../config/keycloak').initKeycloak();

router.route('/')
    .get(keycloak.protect(['admin','user']),shoesController.getAllShoes)
    .post(keycloak.protect('admin'),shoesController.createNewShoe)
    .patch(keycloak.protect('admin'),shoesController.updateShoe)
    .delete(keycloak.protect('admin'),shoesController.deleteShoe)

router.route('/countWithPrice').get(keycloak.protect(),shoesController.countShoesWithPriceOver100)
router.route('/countWithCollaboration').get(keycloak.protect(),shoesController.countShoesWithCollaboration)
router.route('/countWithoutCollaboration').get(keycloak.protect(),shoesController.countShoesWithoutCollaboration)
router.route('/count').get(keycloak.protect(),shoesController.countShoes)
router.route('/countAveragePrice').get(keycloak.protect(),shoesController.averagePrice)
router.route('/highestPrice').get(keycloak.protect(),shoesController.ShoeWithHighestPrice)
router.route('/lowestPrice').get(keycloak.protect(),shoesController.ShoeWithLowestPrice)
router.route('/MostComments').get(keycloak.protect(),shoesController.ShoeWithMostComments)
router.route('/totalComments').get(keycloak.protect(),shoesController.countComments)

module.exports = router