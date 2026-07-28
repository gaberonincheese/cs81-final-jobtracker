import { useState } from 'react'
import './App.css'
//import { Jobs } from './Jobs';

function App() {

  return (
    <div className='App'>
      
        <h1> <b> Job Tracker </b> </h1>
        <p className='paragraph'> This is a tracker for jobs. Input the relevant information to add the 
          job listing to the list of applied jobs. </p>

          <div>
            <Jobs/>
          </div>
    </div>

    
  );
}


export default App


function Jobs() {
  //let nextId = 0;
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const [jobForm, setJobForm] = useState({
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

  const AddJob = () => {
    const job = {
      id: jobs.length === 0 ? 1 : jobs[jobs.length - 1].id + 1,
      name: jobForm.companyName,
      role: jobForm.companyRole
    };
    setJobs([job, ...jobs]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    
    if (isSubmitting) {
      if (!jobForm.companyName || !jobForm.companyRole) {
        setError("All entries must be filled to submit.");        
        setIsSubmitting(false);
      } else {
        //setJobs([{ , name: jobForm.companyName, role: jobForm.companyRole }, ...jobs]);
        AddJob();
      }
    }
  }

  return (
    <form className = "job-tracker" onSubmit={handleSubmit}>
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
        
        {/* Here, if user clicks to submit, we do form validation.*/}
        <button className = "add-job-button" onClick={() => {setIsSubmitting(true)}}> Add this job </button>

         {/* Print the error. */}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {/* Here, making an unordered list of all items in the jobs array.*/}
        <ul className='jobs-map'>
          {jobs.map(job => (<li key={job.id}> {job.id}. Company: {job.name} Role: {job.role} </li>))}
        </ul>
    </form>
  );
}