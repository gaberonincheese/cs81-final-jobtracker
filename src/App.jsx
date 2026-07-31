import { useEffect, useState } from 'react'
import './App.css'
import { getItem, setItem } from './utils/localStorage';

function App() {

  return (
    <div className='App'>

      <h1 className='job-heading'> <b> Job Tracker </b> </h1>
      <p> This is a tracker for jobs. Keep track of applied jobs by inputting relevant information below. </p>

      <br></br>
      <Jobs />
    </div>
  );
}


export default App

function Jobs() {
  
  // Getting any saved jobs and returning either the jobs array or an empty array.
  const [jobs, setJobs] = useState(() => {
    const item = getItem('jobs');
    return item || [];
  });

  // Use effect that changes the saved item every time the jobs array is changed.
  useEffect(() => {
    setItem('jobs', jobs);
  }, [jobs]);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // useState to create a job form.
  const [jobForm, setJobForm] = useState({
    companyName: "",
    companyRole: "",
  });
  
  // This function allows filtering of the jobs array based on the term a user searches for.
  const searchItems = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "" && jobs.length !== 0) {
      setFilteredJobs(jobs.filter(job => { return (job.name.toLowerCase().includes(searchTerm.toLowerCase()) || job.role.toLowerCase().includes(searchTerm.toLowerCase()))}));
    } else {
      setFilteredJobs(jobs);
    }
  }

  // This function takes the job's ID and filters out the relevant job. 
  const deleteJob = (id) => {
    //console.log(id);
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // This function handles input change for the inputs in the form.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setJobForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // This function adds a job to the front of the jobs array using the spread operator.
  const AddJob = () => {
    const nextId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1;

    const job = {
      id: nextId,
      name: jobForm.companyName,
      role: jobForm.companyRole
    };
    setJobs([job, ...jobs]);
  };

  // Form validation.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    if (isSubmitting) {
      if (!jobForm.companyName || !jobForm.companyRole) {
        setError("All entries must be filled to submit.");
        setIsSubmitting(false);
      } else {
        AddJob();
      }
    }
  }

  // This function prints all jobs in passed in array.
  const printJobs = (jobArray) => {
    return jobArray.map(job => 
      (<li key={job.id}> Company: {job.name} Role: {job.role} <button onClick={() => deleteJob(job.id)}> x </button> </li>
      ));
  };

  return (
    <div>
      <form className="job-tracker" onSubmit={handleSubmit}>
        <input
          name="companyName"
          value={FormData.companyName}
          onChange={handleInputChange}
          placeholder='Company?'
        />
      
        <input
          name="companyRole"
          value={FormData.companyRole}
          onChange={handleInputChange}
          placeholder='Applied role?'
        />

        {/* Here, if user clicks to submit, we do form validation.*/}
        <br></br>
        <button onClick={() => { setIsSubmitting(true) }}> Add this job </button>

        {/* Print the error. */}
        {error && <div style={{ color: 'rgb(235, 82, 11)', paddingTop: '20px' }}>{error}</div>}
      </form>
      
      <br></br>

      {/* An input that allows user to look for a specific job in the jobs array.*/}
      <p> Searching for a specific job? </p>
      <input
          name="searchJobInput"
          onChange={(e) => searchItems(e.target.value)}
          placeholder='Search...'
      />
      
      <br></br> <br></br>
      <p> <b> Jobs applied to: </b> </p>

      {/* Here, making an unordered list of all items in the jobs array.*/}
      <ul className='jobs-map'>
        {searchTerm.length >= 1 ? printJobs(filteredJobs) : printJobs(jobs)} 
      </ul>
    </div>
  );
}