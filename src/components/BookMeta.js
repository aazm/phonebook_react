import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import config from '../config'
import axios from 'axios';
import './BookMeta.css';
import Moment from 'react-moment';

export default class BookMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: {},
            loaded: false
        };
    }

    async componentDidMount() {

        const { data } = await axios.get(config.api + '/meta');
        this.setState({meta: data, loaded: true});
    }

    render() {

        const loaded = this.state.loaded;

        let body;

        if (loaded) {

            const {records_count, page_max_size, filename, file_size, updated_at} = this.state.meta;
            const link = config.host + '/storage/' + filename;

            body = <CardBody>
                <CardTitle>Book Meta Information</CardTitle>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Records count: { records_count }</li>
                        <li className="list-group-item">Page max size: { page_max_size }</li>
                        <li className="list-group-item">Updated at:  <Moment format="YYYY-MM-DD HH:MM:SS">{ updated_at }</Moment></li>
                        <li className="list-group-item">File size: { file_size }</li>
                        <li className="list-group-item">Download: <a href={link} target="blank">{ filename }</a></li>
                    </ul>

            </CardBody>
        } else {
            body = <CardBody className="d-flex justify-content-center align-items-center"><CardText><Spinner color="primary"/></CardText></CardBody>;
        }

        return <Card>{ body }</Card>
    }
}