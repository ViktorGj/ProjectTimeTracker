import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom';
import Projects from './Layout/list-projects/projects';
import ProjectDetails from './Layout/project-view/projectDetails';
import AddProject from './Layout/list-projects/addProject';
import EditProject from './Layout/list-projects/editProject';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <nav className='mb-4 pb-4 pt-4'>
          <Link to='/projects'>Home</Link>
        </nav>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/projects' />
          </Route>
          <Route path='/projects' exact component={Projects} />
          <Route path='/projects/add' exact component={AddProject} />
          <Route path='/projects/:id/edit' exact component={EditProject} />
          <Route path='/projects/:id' exact component={ProjectDetails} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
