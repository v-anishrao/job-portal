import { userConstants } from '../_constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export function applyJob(state = {}, action) {
  switch (action.type) {
    case userConstants.APPLYJOB_REQUEST:
      return { applying: true };
    case userConstants.APPLYJOB_SUCCESS:
      return {};
    case userConstants.APPLYJOB_FAILURE:
      return {};
    default:
      return state
  }
}

export function appliedJobs(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_APPLIED_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_APPLIED_SUCCESS:
      const jobIdArray = [];
      for(var index = 0; index < action.jobs.length; index++) {
        jobIdArray.push(action.jobs[index].id);
     }
      return {
        items: jobIdArray
      };
    case userConstants.GETALL_APPLIED_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}