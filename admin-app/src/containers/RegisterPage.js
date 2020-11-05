import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Layout from "../components/Layout";
import Input from "../components/UI/Input";

const RegisterPage = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        id="formBasicFirstName"
                                        label="First Name"
                                        type="text"
                                        placeholder="Enter First Name"
                                        value=""
                                        onChange={() => {}}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        id="formBasicLastName"
                                        label="Last Name"
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value=""
                                        onChange={() => {}}
                                    />
                                </Col>
                            </Row>
                            <Input
                                id="formBasicEmail"
                                label="Email Address"
                                type="email"
                                placeholder="Enter Email Address"
                                value=""
                                onChange={() => {}}
                            />

                            <Input
                                id="formBasicPassword"
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                value=""
                                onChange={() => {}}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default RegisterPage;