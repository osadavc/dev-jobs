document.querySelector(".button-container").addEventListener("click", () => {
  let searchText = document.getElementById("filter-jobs").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, searchText.toLowerCase());
    showJobs(filteredJobs);
  });
});

const getJobs = () => {
  return fetch("http://localhost:8080/jobs")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

function filterJobs(jobs, searchText) {
  if (searchText) {
    console.log(searchText);
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredJobs;
  } else {
    return jobs;
  }
}

const showJobs = (jobs) => {
  let jobsContainer = document.querySelector(".jobs-container");
  let jobsNumber = document.querySelector(".job-no");
  let jobsHTML = "";

  jobs.forEach((job) => {
    jobsHTML += `
        <div class="job-tile">
        <div class="top">
        <img
            src="${job.logo}"
        />
        <span class="material-icons more_horiz">more_horiz</span>
        </div>
        <div class="rolename">${job.roleName}</div>
        <div class="description">
        <span
            >${job.requirements.content}
        </span>
        </div>
        <div class="buttons">
        <div class="button apply-now">Apply Now</div>
        <div class="button">Message</div>
        </div>
        </div>
    `;
  });
  jobsContainer.innerHTML = jobsHTML;
  jobsNumber.textContent = jobs.length;
};

getJobs().then((data) => {
  showJobs(data);
});
