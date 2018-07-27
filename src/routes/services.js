const express = require('express')
const router = express.Router()

const { accounts, writeJSON } = require('../data.js')

router.get('/transfer', (req, res) => {
    res.render('transfer')
})
router.post('/transfer', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    let from_bal = accounts[from].balance
    let to_bal = accounts[to].balance
    accounts[from].balance = from_bal - parseInt(amount)
    accounts[to].balance = to_bal + parseInt(amount)

    writeJSON()

    res.render('transfer', {message: 'Transfer Completed'})
})
router.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit})
})
router.post('/payment', (req, res) => {
    accounts.credit.balance = accounts.credit.balance - req.body.amount
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount)
    
    writeJSON()

    res.render('payment', {message: 'Payment Successful', account: accounts.credit})
})

module.exports = router