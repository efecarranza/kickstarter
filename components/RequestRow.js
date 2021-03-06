import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import getCampaign from '../ethereum/campaign';

class RequestRow extends Component {
    onApprove = async () => {
        const campaign = getCampaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send({ from: accounts[0] });
        } catch (err) {

        }
    };

    onFinalize = async () => {
        const campaign = getCampaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(this.props.id).send({ from: accounts[0] });
        } catch (err) {

        }
    };

    render() {
        const { Row, Cell } = Table;
        const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2;
        return (
            <Row disabled={this.props.request.complete} positive={readyToFinalize && !this.props.request.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value, 'ether')}</Cell>
                <Cell>{this.props.request.recipient}</Cell>
                <Cell>{this.props.request.approvalCount}/{this.props.approversCount}</Cell>
                <Cell>{this.props.request.complete ? null : (<Button color="green" basic onClick={this.onApprove}>Approve</Button>)}</Cell>
                <Cell>{this.props.request.complete ? null : (<Button color="red" basic onClick={this.onFinalize}>Finalize</Button>)}</Cell>
            </Row>
        );
    }
}

export default RequestRow;
