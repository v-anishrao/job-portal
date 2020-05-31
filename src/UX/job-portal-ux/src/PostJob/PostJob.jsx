import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { jobActions } from '../_actions';
import NavBar from '../_components/NavBar';

class PostJobPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {
                jobName: '',
                yearsOfExp: '',
                postedBy: this.props.user.id,
                summary: '',
                company:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { job } = this.state;
        this.setState({
            job: {
                ...job,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { job } = this.state;
        console.log(job);
        if (job.firstName != "" && job.yearsOfExp != "" && job.summary != "") {
            this.props.postJob(job);
        }
    }

    render() {
        const { posting } = this.props;
        const { job, submitted } = this.state;
        return (
            <div>
                <NavBar jobtab={true} home={false} myjobstab={false}/>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Post Job</h2>
                    <form name="form2" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !job.jobName ? ' has-error' : '')}>
                            <label htmlFor="jobName">Job Name</label>
                            <input type="text" className="form-control" name="jobName" value={job.jobName} onChange={this.handleChange} />
                            {submitted && !job.jobName &&
                                <div className="help-block">Job Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !job.yearsOfExp ? ' has-error' : '')}>
                            <label htmlFor="yearsOfExp">Years of experience</label>
                            <input type="text" className="form-control" name="yearsOfExp" value={job.yearsOfExp} onChange={this.handleChange} />
                            {submitted && !job.yearsOfExp &&
                                <div className="help-block">Years Of Experience is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !job.company ? ' has-error' : '')}>
                            <label htmlFor="company">Company</label>
                            <input type="text" className="form-control" name="company" value={job.company} onChange={this.handleChange} />
                            {submitted && !job.company &&
                                <div className="help-block">Company is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !job.summary ? ' has-error' : '')}>
                            <label htmlFor="summary">Summary</label>
                            <textarea type="text" className="form-control" name="summary" value={job.summary} onChange={this.handleChange} />
                            {submitted && !job.summary &&
                                <div className="help-block">Summary is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Post Job" />
                            {posting &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { posting } = state.registration;
    const { authentication } = state;
    const { user } = authentication;
    return { user, posting };
}

const actionCreators = {
    postJob: jobActions.postJob
}

const connectedPostJobPage = connect(mapState, actionCreators)(PostJobPage);
export { connectedPostJobPage as PostJobPage };