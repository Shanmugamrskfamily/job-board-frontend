// src/routes/index.jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import RecruiterDashboard from '../pages/RecruiterDashboard';
import JobSeekerDashboard from '../pages/JobSeekerDashboard';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/recruiter" component={RecruiterDashboard} />
        <Route path="/job-seeker" component={JobSeekerDashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
