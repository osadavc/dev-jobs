document.querySelector(".new-job-submit").addEventListener("click", (e) => {
  e.preventDefault();
  let jobTitle = document.getElementById("jobTitle").value;
  let jobImage = document.getElementById("jobImage").value;
  let jobDescription = document.getElementById("jobDescription").value;

  addNewJob(jobTitle, jobImage, jobDescription);
});

const addNewJob = (jobTitle, jobImage, jobDescription) => {
  if (jobTitle && jobImage && jobDescription) {
    axios.post("http://localhost:8080/jobs", {
      logo: jobImage,
      roleName: jobTitle,
      requirements: {
        content: jobDescription,
      },
    });

    alert("Successfully Added");
  }
};
