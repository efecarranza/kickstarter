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

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return { address, requests, requestCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
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
                    <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button
                            content="Add Request"
                            primary
                        />
                    </a>
                </Link>
            </div>
            </Layout>
        );
    }
}

export default RequestIndex;
