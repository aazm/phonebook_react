import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import BookTable from "./BookTable";
import RecordModal from './RecordModal';
import axios from 'axios';
import config from '../config'

export default class BookContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            records: [],
            total: 0,
            page: 1,

            is_open: false
        };

        this.searchClickHandler = this.searchClickHandler.bind(this);
        this.clearClickHandler = this.clearClickHandler.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
    }

    async bookSearchQuery() {
        const { data } = await axios.get(config.api + '/records');
        this.setState({records: data.items, total: data.total});

    }

    componentDidMount() {
        this.bookSearchQuery();
    }

    searchClickHandler() {
        alert(this.state.query);
    }

    clearClickHandler() {
        this.setState({query: ''});
    }

    openEditModal() {
        this.setState({is_open: true});
    }

    render() {

        const records = this.state.records;
        const isOpen = this.state.is_open;

        return (
            <div>
                <RecordModal opened={isOpen} />
                <Row>
                    <Col>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Name"
                                value={ this.state.query }
                                onChange={e => this.setState({query: e.target.value})}
                            />
                                <div className="input-group-append" id="button-addon4">
                                    <button className="btn btn-outline-success" type="button" onClick={ this.searchClickHandler } >Search</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={ this.clearClickHandler }>Clear</button>
                                </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3 mb-2 justify-content-between align-items-end">
                    <Col className="col-2"><button className="btn btn-sm btn-warning" onClick={ this.openEditModal }>ADD RECORD</button></Col>
                    <Col className="col-2"><span>Total: {this.state.total }</span></Col>
                </Row>
                <Row>
                    <Col>
                        <BookTable records={records} />
                    </Col>
                </Row>
                <Row className="mb-5 justify-content-center">
                    <Col className="col-1"><a href="google.com">Prev</a></Col>
                    <Col className="col-1"><a href="google.com">Next</a></Col>
                </Row>
            </div>
        )
    }
}