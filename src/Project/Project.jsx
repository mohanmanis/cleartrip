import React from 'react';
import format from 'dateformat';
import request from 'superagent';
import cookie from 'react-cookie';
import './Project.css';
import { Button, Glyphicon,Grid, Row, Col } from 'react-bootstrap';

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteModalOpen: false

        };
    }

    truncate(text, limit) {
        if (typeof text !== 'string')
            return '';
        if (text.length < (limit - 3))
            return text;

        let limitedText = text.substring(0, limit - 3);
        return limitedText + ' ... ';
    }

    render() {
        return (
            <Grid>
            <Row className="show-grid">
            <div className="card">
            <Col md={1}>
                <div className="project-info">
                    <span>{this.props.project['s.no']}</span>
                </div>
            </Col>
            <Col md={2}>
                <div className="project-info">
                    {this.props.project.title ? <span>{this.truncate(this.props.project.title, 150)}</span> : <span className="placeholder">No title supplied yet</span>}
                </div>
            </Col>
            <Col md={3}>
                <div className="project-info">
                    <span>{this.props.project['by']}</span>
                </div>
            </Col>
            <Col md={1}>
                <div className="project-info">
                    <span>{this.props.project['percentage.funded']}</span>
                </div>
            </Col>
            <Col md={2}>
                <div className="project-info">
                    <span>{this.props.project['end.time']}</span>
                </div>
            </Col>
            <Col md={3}>
                <div className="project-info">
                    <span>{this.props.project['location']}</span>
                </div>
            </Col>
            </div>
            </Row>
            </Grid>
        );
    }
}

export default Project;
