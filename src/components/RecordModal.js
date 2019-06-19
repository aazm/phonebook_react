import React, {Component} from 'react';
import { Modal } from 'reactstrap';

export default class RecordModal extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <Modal
                size="lg"
                show={this.props.opened}
                aria-labelledby="example-modal-sizes-title-lg"
            >
            </Modal>
        )
    }
}