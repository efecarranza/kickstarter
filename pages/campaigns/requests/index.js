import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;

        return { address };
    }

    render() {
        return (
            <Layout>
            <div>
                <h3>Requests</h3>
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
