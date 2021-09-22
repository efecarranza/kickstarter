import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import RequestRow from '../../../components/RequestRow';
import getCampaign from '../../../ethereum/campaign';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = getCampaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
            <div>
                <h3>Requests</h3>
                    <Link route={`/campaigns/${this.props.address}/requests/new`}>
                        <a>
                            <Button
                                style={{ marginBottom: 10 }}
                                floated="right"
                                content="Add Request"
                                primary
                            />
                        </a>
                    </Link>

                    <Table>
                        <Header>
                            <Row>
                                <HeaderCell>ID</HeaderCell>
                                <HeaderCell>Description</HeaderCell>
                                <HeaderCell>Amount</HeaderCell>
                                <HeaderCell>Recipient</HeaderCell>
                                <HeaderCell>Approval Count</HeaderCell>
                                <HeaderCell>Approve</HeaderCell>
                                <HeaderCell>Finalize</HeaderCell>
                            </Row>
                        </Header>
                        <Body>
                            {this.renderRows()}
                        </Body>
                    </Table>
                    <div>Found {this.props.requestCount} requests.</div>

            </div>
            </Layout>
        );
    }
}

export default RequestIndex;
