import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7353934d51e553b593fc9bcF48feC98B9b4592d8'
);

export default factory;
