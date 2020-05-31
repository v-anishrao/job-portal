import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration, applyJob, appliedJobs } from './registration.reducer';
import { jobs } from './jobs.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  jobs,
  applyJob,
  appliedJobs,
  alert
});

export default rootReducer;