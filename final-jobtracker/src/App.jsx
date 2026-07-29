import { useEffect, useState } from 'react'
import './App.css'
//import { Jobs } from './Jobs';

function App() {

  return (
    <div className='App'>

      <h1 className='job-heading'> <b> Job Tracker </b> </h1>
      <p> This is a tracker for jobs. Input the relevant information to add the
        job listing to the list of applied jobs. </p>

      <br></br>
      <Jobs />
    </div>
  );
}


export default App


function Jobs() {
  //let nextId = 0;
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchItems = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      setFilteredJobs(jobs.filter(job => { return job.name.toLowerCase().includes(searchTerm.toLowerCase())}));
    } else {
      setFilteredJobs(jobs);
    }
  }


  const [jobForm, setJobForm] = useState({
    companyName: "",
    companyRole: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

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
    <div>
      <form className="job-tracker" onSubmit={handleSubmit}>
        <input
          name="companyName"
          value={FormData.companyName}
          onChange={handleInputChange}
          placeholder='Company name'
        />

        <input
          name="companyRole"
          value={FormData.companyRole}
          onChange={handleInputChange}
          placeholder='Desired role'
        />

        {/* Here, if user clicks to submit, we do form validation.*/}
        <button className="add-job-button" onClick={() => { setIsSubmitting(true) }}> Add this job </button>

        {/* Print the error. */}
        {error && <div style={{ color: 'red', paddingTop: '20px' }}>{error}</div>}
      </form>
      
      <br></br>

      <p> Searching for a specific job? </p>
      <input
          name="searchJobInput"
          //value = {searchTerm}
          onChange={(e) => searchItems(e.target.value)}
          placeholder='Search...'
      />
      

      <br></br>
      <br></br>
      <p> <b> Jobs applied to: </b> </p>

      {/* Here, making an unordered list of all items in the jobs array.*/}
      <ul className='jobs-map'>
        {searchTerm.length > 1 ? filteredJobs.map(job => (<li key={job.id}> {job.id}. Company: {job.name} Role: {job.role} </li>)) 
        : jobs.map(job => (<li key={job.id}> {job.id}. Company: {job.name} Role: {job.role} </li>))}
      </ul>
    </div>



  );
}