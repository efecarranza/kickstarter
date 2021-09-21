import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xBE320515891859c3E7d2FB9fB3056373ea458ccC'
);

export default factory;
