import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import config from './../config';

export default class RecordModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            opened: false,


            id: null,
            subscriber: '',
            phone: ''
        };

        this.persistRecord = this.persistRecord.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({...props});
    }

    persistRecord() {

        const data = { subscriber: this.state.subscriber, phone: this.state.phone };

        let request;
        if(this.state.id != null) {
            request = axios.put(config.api + '/records/' + this.state.id, data);
        } else {
            request = axios.post(config.api + '/records', data);
        }

        const that = this;
        request.then(function () {
            that.setState({opened: false});
            that.props.onModalClosed(true);

        }).catch(function(){
            alert('--');
        });
    }

    closeHandler() {
        this.props.onModalClosed();
    }

    render() {

        const header = this.state.id != null ? 'Edit record' : 'Create new record';
        const isOpen = this.state.opened;

        return (
            <Modal
                size="lg"
                isOpen={ isOpen }
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <ModalHeader>
                    <span>{ header }</span>
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <Input type="text" placeholder="Subscriber" value={ this.state.subscriber }
                                       onChange={ e => this.setState({subscriber: e.target.value}) }/>
                            </Col>
                            <Col>
                                <Input type="text" placeholder="Phone"  value={ this.state.phone }
                                       onChange={ e => this.setState({phone: e.target.value}) }/>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" color="primary" onClick={this.persistRecord}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" color="danger" onClick={this.closeHandler}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}