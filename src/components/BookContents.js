import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
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
            size: 5,
            is_open: false,

        };

        this.record = {};

    }

    async bookSearchQuery() {

        let uri = config.api + `/records?page=${this.state.page}&size=${this.state.size}`;

        if(this.state.query.length > 0) {
            uri = uri + `&name=${this.state.query}`;
        }


        const { data } = await axios.get(uri);
        this.setState({records: data.items, total: data.total});
    }

    changePageHandler = (inc) => {
        const page = this.state.page + inc;
        if(page > 0) {
            this.setState({page: page}, () => this.bookSearchQuery());
        }

    }

    componentDidMount() {
        this.bookSearchQuery();
    }

    searchClickHandler = () => {
        this.setState({page: 1}, () => this.bookSearchQuery());
    }

    clearClickHandler = () => {
        this.setState({query: ''}, () => this.bookSearchQuery());
    }

    openCreateModal = () => {
        this.record = {};
        this.openEditModal();
    }

    openEditModal = () => {
        this.setState({is_open: true});
    }

    catchModalClosedEvent = (reload) => {
        this.setState({is_open: false});

        if(reload != undefined) {
            this.record = {};
            this.bookSearchQuery();
        }
    }

    catchEditRecordEvent = (id) => {

        const record = this.state.records.filter(function(record){
            return record.id == id;
        }).pop();

        if(record != undefined) {

            this.record = record;
            this.openEditModal();
        }

    }

    render() {

        const records = this.state.records;
        const isOpen = this.state.is_open;

        const prevPage = (
            this.state.page == 1 ?
                <Col className="col-1"></Col> :
                <Col className="col-1"><a href="javascript:void(0)" onClick={() => this.changePageHandler(-1)}>Prev</a></Col>
        )

        return (
            <div>
                <RecordModal opened={isOpen} {...this.record} onModalClosed={this.catchModalClosedEvent}/>
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
                                    <button className="btn btn-outline-success" type="button" onClick={ () => this.searchClickHandler() } >Search</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={ () => this.clearClickHandler() }>Clear</button>
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
                    { prevPage }
                    <Col className="col-1">{ this.state.page }</Col>
                    <Col className="col-1"><a href="javascript:void(0)" onClick={() => this.changePageHandler(1)}>Next</a></Col>
                </Row>
            </div>
        )
    }
}