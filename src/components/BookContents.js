import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default class BookContents extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )
    }
}