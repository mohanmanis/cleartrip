import React from 'react';
import Project from '../Project/Project.jsx';

const ProjectList = (props) => {
    const projectItems = props.projects.map((project) => {
            return <Project key={project['s.no']} project={project} projectDeleted={props.updateProjectList}/>;
    });

    return (
        <div>
            {projectItems}
        </div>
    );
};

export default ProjectList;
