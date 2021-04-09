import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { apiUrl } from '../../environment';
import { Project } from '../../Models/project.models';

const EditProject = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState({ name: '', description: '', times: [] });

  useEffect(() => {
    getProject(id);
  }, []);

  const getProject = (id: string) => {
    axios
      .get(`${apiUrl}/${id}`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => console.log('Error fetching projects:', err));
  };

  const updateProject = (project: Project) => {
    axios
      .put(`${apiUrl}/${id}`, project)
      .then((res) => {
        history.push('/projects');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateProject(project);
  };

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

  return (
    <div className='form-container'>
      <h4>Edit Project</h4>
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

export default EditProject;
