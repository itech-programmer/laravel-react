import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import DocumentList from "./components/DocumentsList";
import DocumentView from "./components/DocumentView";
import NewDocumentForm from "./components/NewDocumentForm";

function App() {
    return (
        <Router>
            <div className="container">
            <Container className="row justify-content-center align-items-center">
                <Row>
                    <Col md={12}>
                        <Routes>
                            <Route exact path='/' element={<DocumentList/>}/>
                            <Route path="/document/:id" element={<DocumentView/>}/>
                            <Route path="/document" element={<NewDocumentForm/>}/>
                        </Routes>
                    </Col>
                </Row>
            </Container>
            </div>
        </Router>
    );
}

export default App;