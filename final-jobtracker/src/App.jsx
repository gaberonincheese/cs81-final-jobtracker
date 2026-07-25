import { useState } from 'react'
import './App.css'
//import { Jobs } from './Jobs';
//import InputForm from './InputForm';

function App() {

  return (
    <div className='App'>
      
        <h1> <b> Job Tracker </b> </h1>
        <p> This is a tracker for jobs. Input the relevant information to add the 
          job listing to the list of applied jobs. </p>
          <Jobs/>
    </div>
  );
}


export default App


function Jobs() {
  let nextId = 0;
  const [jobs, setJobs] = useState([]);
  
  function handleAddJob() {
    const newJob = {
      id: nextId++, 
      name: jobForm.companyName,
      role: jobForm.companyRole
    }
    
    setJobs(jobs => [newJob, ...jobs]);
  }
  
  const [jobForm, setJobForm] = useState({
    companyName: "",
    companyRole: ""
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    
    setJobForm(prevData => ({
      ...prevData, 
      [name]: value
    }));
  };

  return (
    <>
        <input
          name="companyName"
          value={FormData.companyName}
          onChange={handleInputChange}
          placeholder= 'Company name'
        />

        <input
          name="companyRole"
          value={FormData.companyRole}
          onChange={handleInputChange}
          placeholder= 'Role applied for'
        />
        
        {/* Here, adding the job to the jobs array through setJobs.*/}
        <button onClick={() => {
          //setJobs([{ id: nextId++, job: jobForm.companyName, role: jobForm.role }, ...jobs]);
          handleAddJob();
        }}>Add this job </button>

        {/* Here, making an unordered list of all items in the jobs array.*/}
        <ul>
          {jobs.map(job => (
            <li key={job.id}> {job.id}. Company: {job.name} Role: {job.role} </li>
          ))}
        </ul>
    </>
  );
}