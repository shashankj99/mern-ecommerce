import React from "react";
import Layout from "../components/Layout";
import {Container, Form, Button, Row, Col} from "react-bootstrap";
import Input from "../components/UI/Input";

const LoginPage = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
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

export default LoginPage;
