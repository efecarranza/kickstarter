import React, { Component } from 'react';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';
import { Card, Form, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = getCampaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCampaign() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this amount of Wei to participate.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance (ether)',
                description: 'Current balance of the campaign.'
            },
            {
                header: requestsCount,
                meta: 'Pending Requests Count',
                description: 'Requests pending vote from approvers.'
            },
            {
                header: approversCount,
                meta: 'Approvers Count',
                description: 'Number of people who have contributed to this campaign.'
            }
        ];

        return <Card.Group items={items} />;
    }

    render () {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCampaign()}

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a><Button primary>View Requests</Button></a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;
