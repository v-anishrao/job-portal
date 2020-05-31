import { jobConstants } from '../_constants';
import { jobService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const jobActions = {
    postJob,
    delete: _delete,
    getAll
};

function postJob(job) {
    return dispatch => {
        dispatch(request(job));

        jobService.postJob(job)
            .then(
                job => { 
                    dispatch(success());
                    history.push('/home');
                    dispatch(alertActions.success('Post Job successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: jobConstants.POST_REQUEST, user } }
    function success(user) { return { type: jobConstants.POST_SUCCESS, user } }
    function failure(error) { return { type: jobConstants.POST_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        jobService.getAll()
            .then(
                jobs => dispatch(success(jobs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: jobConstants.GETALL_REQUEST } }
    function success(jobs) { return { type: jobConstants.GETALL_SUCCESS, jobs } }
    function failure(error) { return { type: jobConstants.GETALL_FAILURE, error } }
}

function _delete(job) {
    return dispatch => {
        dispatch(request());

        jobService.delete(job)
            .then(
                jobs => {
                    dispatch(success(jobs));
                    window.location.reload(false);
                    dispatch(alertActions.success('Delete Job successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: jobConstants.DELETE_REQUEST } }
    function success(jobs) { return { type: jobConstants.DELETE_SUCCESS, jobs } }
    function failure(error) { return { type: jobConstants.DELETE_FAILURE, error } }
}