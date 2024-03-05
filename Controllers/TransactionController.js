const transactionSchema = require("../Models/TransactionModel");

const createTransaction = async (req, res) => {
   
    try{
        const createdTransaction = await transactionSchema.create(req.body);
        
        res.status(201).json({
            message:"transaction created successfully",
            data:createdTransaction,
            flag:1 
        })
    } catch(err){
        res.status(500).json({
            message:"error creating transaction",
            error:err,
            flag:-1
        })
    }
}

const getTransaction = async (req, res) => {
   
    try{
        const transactionData = await transactionSchema.find().populate([
            {path:'user'},
            {path:'payee'},
            {path:'category'},
            {path:'subCategory'},
            {path:'paymentType'},
            {path:'transactionType'}
        ]);
        
        res.status(200).json({
            message:"getTransaction...",
            data:transactionData,
            flag:1
        })
    } catch(err){
        res.status(404).json({
            message:"error getting transaction",
            error:err,
            flag:-1
        })
    }
}

const getTransactionById = async (req, res) => {
   
    try{
        const transaction = await transactionSchema.findById(req.params.id).populate([
            {path:'user', select:'firstName -_id'},
            {path:'payee', select:'payeeName -_id'},
            {path:'category', select:'categoryName -_id'},
            {path:'subCategory', select:'subCategoryName -_id'},
            {path:'paymentType', select:'paymentType -_id'},
            {path:'transactionType', select:'transactionType -_id'}
        ]);
        
        res.status(200).json({
            message:"transaction found",
            data:transaction,
            flag:1
        })
    } catch(err){
        res.status(404).json({
            message:"transaction not found",
            error:err,
            flag:-1
        })
    }
}

const updateTransactionById = async (req, res) => {
   
    try{
        const id = req.params.id;
        const newData = req.body;

        const updatedTransaction = await transactionSchema.findByIdAndUpdate(id, newData);
        
        res.status(200).json({
            message:"transaction updated successfully",
            data:updatedTransaction,
            flag:1
        })
    } catch(err){
        res.status(404).json({
            message:"error updating transaction",
            error:err,
            flag:-1
        })
    }
}

const deleteTransactionById = async (req, res) => {
   
    try{
        const deletedTransaction = await transactionSchema.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            message:"transaction deleted successfully",
            data:deletedTransaction,
            flag:1
        })
    } catch(err){
        res.status(404).json({
            message:"error deleting transaction",
            error:err,
            flag:-1
        })
    }
}

const getTransactionByUserId = async (req, res) => {
   
    try{
        const id = req.body.userId;
       // console.log('user id..', id);
        const transactionData = await transactionSchema.find({user:id}).populate([
            {path:'user'},
            {path:'payee'},
            {path:'category'},
            {path:'subCategory'},
            {path:'paymentType'},
            {path:'transactionType'}
        ]);

        res.status(200).json({
            message:'transaction found',
            data:transactionData,
            flag:1
        })
    }catch(err) {
        res.status(404).json({
            message:'transaction not found',
            error:err,
            flag:-1
        })
    }
}

module.exports = {
    createTransaction,
    getTransaction,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById,
    getTransactionByUserId
}