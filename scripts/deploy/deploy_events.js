document.addEventListener('DOMContentLoaded', function() {
    showLoader()
    getRepos()
    .finally(()=>hideLoader())
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deploy_repo'); // Get the form by its ID
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the default form submission behavior
      const repo_name = document.getElementById('repos_select_name').value;
      const repo_text = document.getElementById('repos_select_name').innerText;
      showLoader()
      cloneRepo(repo_name)
      .then(()=>{
        installRepo(repo_name)
      })
      .finally(()=>hideLoader())
    });
  });
