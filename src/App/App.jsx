import React, {PropTypes} from 'react';
import Project from '../Project/Project.jsx';

const styles = {
    pageContent: 'page-content'
};

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className="col-sm-8">
                            <div className={styles.pageContent}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default App;
