import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import config from '../../../../../../config';

export default class RecordModal extends Component {

    constructor(props) {
        super(props);
        this.state = { opened: false, ...this.getDefaultState()};
    }

    getDefaultState() {

        return {

            id: null,
            subscriber: '',
            phone: '',

            errors: {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({...this.getDefaultState(), ...props});
    }

    persistRecord = () => {


        const data = { subscriber: this.state.subscriber, phone: this.state.phone };
        let request;

        if(this.state.id != null) {
            request = axios.put(config.api + '/records/' + this.state.id, data);
        } else {
            request = axios.post(config.api + '/records', data);
        }

        request.then(() => {

            this.setState({opened: false});
            this.props.onModalClosed(true);

        }).catch((e) => console.log(e));
    }

    saveHandler = () => {
        this.persistRecord();
    }

    closeHandler = () => {
        this.props.onModalClosed();
    }

    updateHandler = (field, value) => {
        this.setState({[field]: value});
        this.validateField(field, value);
    }

    validateField = (field, value) => {

        const errors = this.state.errors;
        let fieldValid = true;

        switch (field) {
            case 'subscriber':
                fieldValid = value.length >= 4;
                errors.subscriber = fieldValid ? '' : 'Subscriber name is too short';
                break;
            case 'phone':
                fieldValid = value.length >= 4;
                errors.phone = fieldValid ? '' : 'Phone is too short';
                break;
        }

        this.setState({errors});
    }

    isFormValid = () => {
        return Object.values(this.state.errors).filter(e => e.length > 0).length == 0
            && this.state.subscriber.length > 0
            && this.state.phone.length > 0
    }

    render() {

        const header = this.state.id != null ? 'Edit record' : 'Create new record';
        const isOpen = this.state.opened;
        const errors = this.state.errors;
        const isValid = this.isFormValid();

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
                                <Input
                                    type="text"
                                    placeholder="Subscriber"
                                    name="subscriber"
                                    className={ 'subscriber' in errors && errors.subscriber.length > 0 ? 'is-invalid' : '' }
                                    value={ this.state.subscriber }
                                    onChange={ e => this.updateHandler(e.target.name, e.target.value) }
                                />
                                <div className="invalid-feedback">{ errors.subscriber }</div>
                            </Col>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    className={ 'phone' in errors && errors.phone.length > 0 ? 'is-invalid' : '' }
                                    value={ this.state.phone }
                                    onChange={ e => this.updateHandler(e.target.name, e.target.value) }/>
                                <div className="invalid-feedback">{ errors.phone }</div>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" color="primary" onClick={this.saveHandler} disabled={!isValid}>
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