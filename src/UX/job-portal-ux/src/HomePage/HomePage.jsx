import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, jobActions } from '../_actions';
import NavBar from '../_components/NavBar';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.props.getJobs();
        console.log(this.props);
        this.props.getAppliedJobs(this.props.user);
    }

    handleApplyJob(job) {
        console.log(job);
        const { user } = this.props;
        this.props.applyJob(user, job);
    }


    render() {
        const { user, jobs, appliedJobs } = this.props;
        console.log("Applied Jobs");
        console.log(appliedJobs.items);
        return (
            <div>
                <div className="col-md-100 container-fullwidth">
                    <NavBar jobtab={false} home={true} myjobstab={false}/>
                    <div className="col-md-6">
                        <h4>Hi {user.firstName}! Here are some jobs for you!</h4>
                    </div>
                    {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>}
                    <div className="col-md-12 container">
                        {(jobs.loading || appliedJobs.loading) &&  <em>Loading jobs...</em>}
                        {jobs.items && appliedJobs.items &&
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-md-2">Job Id</th>
                                        <th className="col-md-2">Job Name</th>
                                        <th className="col-md-2">Company</th>
                                        <th className="col-md-4">Summary</th>
                                        <th className="col-md-4">Apply Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.items.map((job, index) => {
                                        if (job.postedBy != user.id) {
                                            return <tr>
                                                <td styles="vertical-align: middke !important">{job.id}</td>
                                                <td>{job.jobName}</td>
                                                <td>{job.company}</td>
                                                <td>{job.summary}</td>
                                                <td>
                                                    <button className={'btn ' + (appliedJobs.items.includes(job.id) ? ' btn-success disabled' : 'btn-primary ')} onClick={() => { this.handleApplyJob(job) }}>{(appliedJobs.items.includes(job.id) ? ' Applied' : 'Apply')}</button>
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
    const {appliedJobs} = state; 
    console.log("Inside mapped state");
    console.log(state);   
    return { user, jobs, appliedJobs };
}

const actionCreators = {
    getJobs: jobActions.getAll,
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    applyJob: userActions.applyJob,
    getAppliedJobs: userActions.getAppliedJobs
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };