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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const [jobForm, setJobForm] = useState({
    companyID: 0,
    companyName: "",
    companyRole: ""
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    
    setJobForm(prevData => ({
      ...prevData, 
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    
    if (isSubmitting) {
      if (!jobForm.companyName || !jobForm.companyRole) {
        setError("All entries must be filled to submit.");        
        setIsSubmitting(false);
      } else {
        setJobs([{ id: nextId++, name: jobForm.companyName, role: jobForm.companyRole }, ...jobs]);
      }
    }
      
      
      /* !jobForm.companyName || !jobForm.companyRole) 
      {
        setError("All entries must be filled to submit.");        
        return;
      } else {
        setIsSubmitting(true);
      } */

  }

  return (
    <form onSubmit={handleSubmit}>
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
        
        {/* Printing error. */}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {/* Here, adding the job to the jobs array through setJobs.*/}
        <button onClick={() => {
          setIsSubmitting(true) }}>Add this job </button>

        {/* Here, making an unordered list of all items in the jobs array.*/}
        <ul>
          {jobs.map(job => (
            <li key={job.id}> {job.id}. Company: {job.name} Role: {job.role} </li>
          ))}
        </ul>
    </form>
  );
}