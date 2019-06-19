import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Button, Input, Row, Col, Container } from 'reactstrap';

export default class RecordModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            opened: false,

            id: null,
            subscriber: '',
            phone: ''
        };

        if('record' in props) {
            this.state = { ...props }
        }

        this.persistRecord = this.persistRecord.bind(this);
        this.closeHandler = this.closeHandler.bind(this);

    }

    componentWillReceiveProps(props) {
        this.setState({opened: props.opened});
    }

    persistRecord() {
        alert('persist');
    }

    closeHandler() {
        this.setState({opened: false});
    }

    render() {

        const header = 'record' in this.state ? 'Edit record' : 'Create new record';
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
                                <Input type="text" placeholder="Subscriber" value={this.state.subscriber}
                                       onChange={e => this.setState({subscriber: e.target.value}) }/>
                            </Col>
                            <Col>
                                <Input type="text" placeholder="Phone"  value={ this.state.phone }
                                        onChange={e => this.setState({phone: e.target.value })} />
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