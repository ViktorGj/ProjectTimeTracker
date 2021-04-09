import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Project } from '../../Models/project.models';
import { apiUrl } from '../../environment';
import { BsEyeFill } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

const Projects = () => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get(apiUrl)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log('Error fetching projects:', err));
  };

  const onDelete = (id: string | undefined) => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then((res) => {
        getProjects();
      })
      .catch((err) => console.log(err));
  };

  const onView = (id: string | undefined) => {
    if (!id) {
      return;
    }
    history.push(`/projects/${id}`);
  };

  const onEdit = (id: string | undefined) => {
    if (!id) {
      return;
    }
    history.push(`/projects/${id}/edit`);
  };

  return (
    <div>
      <div className='mb-3 d-flex'>
        <h4>List Projects</h4>
        <Link className='btn btn-primary ml-auto' to='/projects/add'>Add</Link>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Description</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p: Project) => {
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td className='d-flex justify-content-end'>
                  <span className='cursor-pointer' onClick={() => onView(p.id)}>
                    <BsEyeFill />
                  </span>
                  <span className='pl-3 cursor-pointer' onClick={() => onEdit(p.id)}>
                    <BsPencil />
                  </span>
                  <span className='pl-3 cursor-pointer' onClick={() => onDelete(p.id)}>
                    <BsTrash color='red' />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
