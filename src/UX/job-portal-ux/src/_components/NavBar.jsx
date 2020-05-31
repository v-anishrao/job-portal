import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/home">Job Portal</Link>
                            </div>
                                {this.props.home && !this.props.jobtab && !this.props.myjobstab &&
                                    <ul className="nav navbar-nav">
                                    <li className="active"><Link to="/home">Home</Link></li>
                                    <li><Link to="/postjob">Post Job</Link></li>
                                    <li><Link to="/myjobs">My Jobs</Link></li>
                                    </ul>
                                }
                                {!this.props.home && this.props.jobtab && !this.props.myjobstab &&
                                    <ul className="nav navbar-nav">
                                    <li><Link to="/home">Home</Link></li>
                                    <li className="active"><Link to="/postjob">Post Job</Link></li>
                                    <li><Link to="/myjobs">My Jobs</Link></li>
                                    </ul>
                                }
                                {!this.props.home && !this.props.jobtab && this.props.myjobstab &&
                                    <ul className="nav navbar-nav">
                                    <li><Link to="/home">Home</Link></li>
                                    <li><Link to="/postjob">Post Job</Link></li>
                                    <li className="active"><Link to="/myjobs">My Jobs</Link></li>
                                    </ul>
                                }
                                
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/login"><span className="glyphicon glyphicon-log-out"></span> Log Out</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

export default NavBar