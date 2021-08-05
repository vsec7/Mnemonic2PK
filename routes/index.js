var express = require('express');
var router = express.Router();
const HDWallet = require('ethereum-hdwallet');
const bip39 = require('bip39');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/result', function(req, res, next) {

	const mnemonic = req.body.mnemonic;
	const seed = bip39.mnemonicToSeed(mnemonic);
  	const derivePath = "m/44'/60'/0'/0/0"
  	console.log(mnemonic)
  	const hdwallet = HDWallet.fromSeed(seed)
  	const addr = `0x${hdwallet.derive(derivePath).getAddress().toString('hex')}`;
  	const pk = `0x${hdwallet.derive(derivePath).getPrivateKey().toString('hex')}`;

  	res.render('result', { query: { 'addr': addr, 'pk': pk } });
});


module.exports = router;
