import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import BookTable from "./BookTable";

export default class BookContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            records: [
                {id: 1, subscriber: 'Alexey', phone: '+79856916219'},
                {id: 2, subscriber: 'Alexey', phone: '+79856916219'},
                {id: 3, subscriber: 'Alexey', phone: '+79856916219'},
            ]
        };

        this.searchClickHandler = this.searchClickHandler.bind(this);
        this.clearClickHandler = this.clearClickHandler.bind(this);
    }

    componentDidMount() {

    }

    searchClickHandler() {
        alert(this.state.query);
    }

    clearClickHandler() {
        this.setState({query: ''});
    }

    render() {

        const records = this.state.records;

        return (
            <div>
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
                <Row>
                    <Col>
                        <BookTable records={records} />
                    </Col>
                </Row>
            </div>
        )
    }
}