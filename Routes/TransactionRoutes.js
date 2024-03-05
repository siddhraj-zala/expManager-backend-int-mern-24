const router = require("express").Router();
const transactionController = require("../Controllers/TransactionController");

router.post('/createTransaction', transactionController.createTransaction);
router.get("/getTransaction", transactionController.getTransaction);
router.get('/getTransactionById/:id', transactionController.getTransactionById);
router.put('/updateTransactionById/:id', transactionController.updateTransactionById);
router.delete('/deleteTransactionById/:id', transactionController.deleteTransactionById);
router.post('/getTransactionByUserId', transactionController.getTransactionByUserId);

module.exports = router;