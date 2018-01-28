import React from 'react';
import {IndexLink} from 'react-router';
import cookie from 'react-cookie';
import ProjectList from '../ProjectList/ProjectList.jsx';
import request from 'superagent';
import './HomePage.css';
import { FormControl, MenuItem, DropdownButton, Button, Glyphicon,Grid, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            locations : [],
            locationsDropdown : '',
            originalProjects: [],
            loading: false,
            error: false,
            buttonDisabled : true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleResetFilter = this.handleResetFilter.bind(this);

    }

    componentDidMount() {
        this.getProjectList();
    }

    handleClick(event) {
        let elementName = event.target.dataset.name;
        if(elementName == 'sortPercentage'){
            ReactDOM.findDOMNode(this.refs.sortPercentage).classList.toggle('fa-sort-asc');
            let domClass = ReactDOM.findDOMNode(this.refs.sortPercentage).classList.value;
            let sortedProjects = this.state.originalProjects.sort((a,b) =>{
                if(domClass.indexOf('fa fa-sort-desc fa-sort-asc') >= 0){
                    return a['percentage.funded'] - b['percentage.funded'];
                }else{
                    return b['percentage.funded'] - a['percentage.funded'];
                }
            })
            this.setState({ projects: sortedProjects });
        }else if(elementName == 'sortTime'){
            ReactDOM.findDOMNode(this.refs.sortTime).classList.toggle('fa-sort-asc');
            let domClass = ReactDOM.findDOMNode(this.refs.sortTime).classList.value;
            let sortedProjects = this.state.originalProjects.sort((a,b) =>{
                if(domClass.indexOf('fa fa-sort-desc fa-sort-asc') >= 0){
                    return new Date(a['end.time']) - new Date(b['end.time']);
                }else{
                    return new Date(b['end.time']) - new Date(a['end.time']);
                }
            })
            this.setState({ projects: sortedProjects });
        }
        
    }

    handleSelect(event) {
        ReactDOM.findDOMNode(this.refs.location).parentNode.parentNode.childNodes[0].innerHTML = event+' <span class="caret"></span>';
        let filteredProjects = this.state.originalProjects.filter(project => project.location.toLowerCase().indexOf(event.toLowerCase()) >= 0);
        this.setState({ projects: filteredProjects });

        this.setState({buttonDisabled: false});

    }

    handleChange(event) {
        let searchPattern = event.target.value;
        if(searchPattern.length == 0){
            this.setState({ projects: this.state.originalProjects }); 
        }else if(searchPattern.length >= 3){
            let filteredProjects = this.state.originalProjects.filter(project => project.title.toLowerCase().indexOf(searchPattern.toLowerCase()) >= 0);
            this.setState({ projects: filteredProjects });
        }
        
    }

    handleResetFilter(event){
        ReactDOM.findDOMNode(this.refs.location).parentNode.parentNode.childNodes[0].innerHTML = 'Filter Based on location'+' <span class="caret"></span>';
        this.setState({ projects: this.state.originalProjects });
        this.setState({buttonDisabled: true});
    }
    

    getProjectList() {
        const url = "http://starlord.hackerearth.com/kickstarter";

        // set loading true
        this.setState(Object.assign(this.state, {loading: true}));

        request.get(url).end((error, response) => {
            if (error || !response.ok || !response.text) {
                this.setState({projects: [], loading: false, error: true});
            } else {
                response = JSON.parse(response.text);
                this.setState({projects: response, loading: false});
                this.setState({originalProjects: response, loading: false});
                this.setState({locations: [...new Set(this.state.projects.map(item => item.location))]});
                
            }
        });
        
    }
    render() {
           
        return (
            <div>
                <div className='title-container'>
                    <h3>Top Kickstarter Projects</h3><br></br>
                    <hr></hr>
                    <form>
                    <FormControl
                        type="text"
                        length = "5"
                        name= "search"
                        value={this.state.value}
                        placeholder="Filter by title"
                        onChange={this.handleChange}
                    />
                    {!this.state.loading && <DropdownButton  className = "filter" title='Filter Based on location' onSelect = {this.handleSelect}>
                                {this.state.locations.map((project,i) => {
                                        return  <MenuItem ref= "location" eventKey = {project} key={project}>{project}</MenuItem>
                        
                                })}
                     </DropdownButton>}
                            {!this.state.loading &&<Button ref='resetFilter' className = 'reset-filter' bsStyle="warning" disabled= {this.state.buttonDisabled} onClick={this.handleResetFilter}>Reset Filter</Button> }
                    </form>
                </div><br></br><br></br>
                <Grid>
                <Row className="show-grid">
                    <div className="card">
                        <Col md={1}><div><label>Id</label></div></Col>
                        <Col md={2}><div><label>Title</label></div></Col>
                        <Col md={3}><div><label>By</label></div></Col>
                        <Col md={1}>
                            <div>
                            <label>%Funded</label>
                            <i data-name="sortPercentage" ref="sortPercentage" class="fa fa-sort-desc" onClick = {this.handleClick}></i>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                            <label>End Time</label>
                            <i data-name="sortTime"ref="sortTime" class="fa fa-sort-desc" onClick = {this.handleClick}></i>
                            </div>
                        </Col>
                        <Col md={3}><div><label>Location</label></div></Col>
                    </div>
                </Row>
                </Grid>
                <div><ProjectList projects={this.state.projects} updateProjectList={this.getProjectList.bind(this)}></ProjectList></div>
                {(this.state.loading && this.state.projects.length == 0) && <div className='no-projects-message'>
                    <p>Projects loading ...</p>
                </div>}
                {(!this.state.error && this.state.projects.length === 0 && !this.state.loading) && <div className='no-projects-message'>
                    <p>You have no Projects!</p>
                </div>}
                {(this.state.error) && <div className='no-projects-message'>
                    <p>Loading your projects failed! Please try again later.</p>
                </div>}
            </div>
        );
    }
}

export default HomePage;
