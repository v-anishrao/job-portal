import { jobConstants } from '../_constants';

export function postJob(state = {}, action) {
  console.log("Post Job Reducer")
  switch (action.type) {
    case jobConstants.POST_REQUEST:
      return { posting: true };
    case jobConstants.POST_SUCCESS:
      return {};
    case jobConstants.POST_FAILURE:
      return {};
    default:
      return state
  }
}