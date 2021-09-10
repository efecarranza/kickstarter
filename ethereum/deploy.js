const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const infura_endpoint = 'https://rinkeby.infura.io/v3/d509fb5c95c04ae49799a35691d3d7bc';

const provider = new HDWalletProvider(
    'dutch first gospel zoo pipe phrase scene guard crime salt green creek',
    infura_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '5000000', from: accounts[0] });

    console.log('contract deployed to: ', result.options.address);
};

deploy();
