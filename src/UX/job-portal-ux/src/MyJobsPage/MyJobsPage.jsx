import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, jobActions } from '../_actions';
import NavBar from '../_components/NavBar';

class MyJobsPage extends React.Component {

    constructor(props) {
        super(props);
        this.props.getJobs();
    }

    handleDeleteJob(job) {
        console.log(job);
        this.props.deleteJob(job)
    }


    render() {
        const { user, jobs } = this.props;
        return (
            <div>
                <div className="col-md-100 container-fullwidth">
                    <NavBar jobtab={false} home={false} myjobstab={true}/>
                    <div className="col-md-6">
                        <h4>Hi {user.firstName}! Here are the jobs you created!</h4>
                    </div>
                    {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>}
                    <div className="col-md-12 container">
                        {jobs.loading  &&  <em>Loading jobs...</em>}
                        {jobs.items &&
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-md-2">Job Id</th>
                                        <th className="col-md-2">Job Name</th>
                                        <th className="col-md-2">Company</th>
                                        <th className="col-md-4">Summary</th>
                                        <th className="col-md-4">Modify</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.items.map((job, index) => {
                                        if (job.postedBy == user.id) {
                                            return <tr key={job.id}>
                                                <td styles="vertical-align: middle !important">{job.id}</td>
                                                <td>{job.jobName}</td>
                                                <td>{job.company}</td>
                                                <td>{job.summary}</td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => { this.handleDeleteJob(job) }}>Delete</button>
                                                </td>
                                            </tr>
                                        }
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { jobs, authentication } = state;
    const { user } = authentication;
    return { user, jobs };
}

const actionCreators = {
    getJobs: jobActions.getAll,
    deleteJob: jobActions.delete,
}

const connectedMyJobsPage = connect(mapState, actionCreators)(MyJobsPage);
export { connectedMyJobsPage as MyJobsPage };