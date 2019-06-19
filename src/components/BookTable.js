import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class BookTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const records = this.props.records;
        const count = records.length;

        if(!count) {
            return (
                <div className="pt-4"><h4>No items found!</h4></div>
            );
        }

        const rows = records.map(function(record){
           return (<tr>
               <td>{ record.id }</td>
               <td>{ record.subscriber }</td>
               <td>{ record.phone }</td>
               <td>
                   <button className="btn btn-sm btn-success"><FontAwesomeIcon icon={ faEdit } /></button>
                   <button className="btn btn-sm btn-danger ml-1"><FontAwesomeIcon icon={ faTrash } /></button>
               </td>
           </tr>);
        });

        return (
            <div className="pt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Record ID</th>
                            <th>Subscriber</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{ rows }</tbody>
                </table>
            </div>
        )
    }
}