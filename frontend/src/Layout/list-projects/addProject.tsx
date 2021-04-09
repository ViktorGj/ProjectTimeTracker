import { useHistory } from 'react-router-dom';
import { Project } from '../../Models/project.models';
import { apiUrl } from '../../environment';
import axios from 'axios';
import { useState } from 'react';
import './addEdit.scss';

const AddProject = () => {
  const history = useHistory();

  const [project, setProject] = useState({ name: '', description: '', times: [] });

  const handleNameChange = (event: any) => {
    event.persist();
    setProject((values) => ({
      ...values,
      name: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: any) => {
    event.persist();
    setProject((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

  const addNewProject = (newProject: Project) => {
    axios
      .post(apiUrl, project)
      .then((res) => {
        history.push('/projects');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addNewProject(project);
  };

  return (
    <div className='form-container'>
      <h4>Add Project</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input type="text" className="form-control" value={project.name} onChange={handleNameChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Project Description</label>
          <textarea className="form-control" value={project.description} onChange={handleDescriptionChange} />
        </div>
        <input type='submit' className='btn btn-primary' value='Save' />
      </form>
    </div>
  );
};

export default AddProject;
