import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import config from '../config'
import 'axios';
import './BookMeta.css';

export default class BookMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: {},
            loaded: false
        };
    }

    render() {


        const loaded = this.state.loaded;
        let body;

        if (loaded) {
            body = <CardBody>
                <CardTitle>Book Meta Information</CardTitle>
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

    componentDidMount() {

    }
}