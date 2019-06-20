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

            is_open: false,
            id_editing: null,
        };

        this.record = {};

        //todo: catchEditRecordEvent = () => { console.log() }
        this.searchClickHandler = this.searchClickHandler.bind(this);
        this.clearClickHandler = this.clearClickHandler.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openCreateModal = this.openCreateModal.bind(this);
        this.catchModalClosedEvent = this.catchModalClosedEvent.bind(this);
        this.catchEditRecordEvent = this.catchEditRecordEvent.bind(this);
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

    openCreateModal() {
        this.record = {};
        this.openEditModal();
    }

    openEditModal() {
        this.setState({is_open: true});
    }

    catchModalClosedEvent(reload) {
        this.setState({is_open: false});

        if(reload != undefined) {
            this.record = {};
            this.bookSearchQuery();

            this.setState({id_editing: null});

        }
    }

    catchEditRecordEvent(id) {

        const record = this.state.records.filter(function(record){
            return record.id == id;
        }).pop();

        if(record != undefined) {

            this.setState({id_editing: id});
            this.record = record;
            this.openEditModal();
        }

    }

    render() {

        const records = this.state.records;
        const isOpen = this.state.is_open;

        return (
            <div>
                <RecordModal opened={isOpen} onModalClosed={this.catchModalClosedEvent}/>
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
                    <Col className="col-2"><button className="btn btn-sm btn-warning" onClick={ this.openCreateModal }>ADD RECORD</button></Col>
                    <Col className="col-2"><span>Total: {this.state.total }</span></Col>
                </Row>
                <Row>
                    <Col>
                        <BookTable records={records} handleEditRecordEvent={this.catchEditRecordEvent}/>
                    </Col>
                </Row>
                <Row className="mb-5 justify-content-center">
                    <Col className="col-1"><a href="google.com">Prev</a></Col>
                    <Col className="col-1">{ this.state.page }</Col>
                    <Col className="col-1"><a href="google.com">Next</a></Col>
                </Row>
            </div>
        )
    }
}