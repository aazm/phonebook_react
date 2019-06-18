import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import config from '../config'
import axios from 'axios';
import './BookMeta.css';

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

        console.log('+++');
        console.log(data);
        console.log('+++');
    }

    render() {

        const loaded = this.state.loaded;
        let body;

        if (loaded) {

            const {records_count, page_max_size, filename, file_size, updated_at} = this.state.meta;
            const link = config.host + '/' + filename;

            body = <CardBody>
                <CardTitle>Book Meta Information</CardTitle>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Records count: { records_count }</li>
                        <li className="list-group-item">Page max size: { page_max_size }</li>
                        <li className="list-group-item">Updated at: { updated_at }</li>
                        <li className="list-group-item">File size: { file_size }</li>
                        <li className="list-group-item"><a href={link} target="blank">File</a></li>
                    </ul>

            </CardBody>
        } else {
            body = <CardBody className="d-flex justify-content-center align-items-center"><CardText><Spinner color="primary"/></CardText></CardBody>;
        }

        return <Card>{ body }</Card>

        return (
            <div>
                {loaded ?
                    (<Card>
                        <CardBody>
                            <CardTitle>Book Meta Information</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the
                                card's content.</CardText>
                        </CardBody>
                    </Card>) : (<span>Loading</span>)
                }

            </div>
        )
    }
}