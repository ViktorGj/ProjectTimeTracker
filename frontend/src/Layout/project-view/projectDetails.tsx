import '../project-view/projectDetails.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../environment';
import { Time } from '../../Models/project.models';
import { BsTrash } from 'react-icons/bs';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState({ name: '', description: '', times: [] });
  const [time, setTime] = useState({ description: '', amount: 0 });

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

  const onDelete = (timeId: string | undefined) => {
    if (!timeId) {
      return;
    }
    axios
      .delete(`${apiUrl}/${id}/times/${timeId}`)
      .then((res) => {
        getProject(id);
      })
      .catch((err) => console.log(err));
  };

  const handleAmount = (event: any) => {
    event.persist();
    setTime((values) => ({
      ...values,
      amount: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: any) => {
    event.persist();
    setTime((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

  const addTime = (time: Time) => {
    axios
      .post(`${apiUrl}/${id}/times`, time)
      .then((res) => {
        getProject(id);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTime(time);
  };

  const total = project.times.reduce((total, curr: Time) => total + Number(curr.amount), 0);

  return (
    <div className='details-container'>
      <h4 className='mb-4'>Project Summary</h4>
      <p><span className='text-bold'>Name:</span> {project.name}</p>
      <p><span className='text-bold'>Description:</span> {project.description}</p>
      <h5 className='mb-4'>List Times</h5>

      <form className='mb-4'>
        <div className='form-row'>
          <div className='col-7'>
            <input type='text' className='form-control' placeholder='Description' onChange={handleDescriptionChange} />
          </div>
          <div className='col'>
            <input type='number' className='form-control' placeholder='Amount' onChange={handleAmount} />
          </div>
          <div className='col'>
            <button className='btn btn-primary' onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </form>

      <table className='table'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Amount</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {project.times.map((t: Time) => {
            return (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>{t.amount}</td>
                <td className='d-flex justify-content-end'>
                  <span className='pl-3 cursor-pointer' onClick={() => onDelete(t.id)}>
                    <BsTrash color='red' />
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className='text-bold'>
            <td>Total Hours:</td>
            <td>{total}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;
