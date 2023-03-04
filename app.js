const githubUsername = "robertogalan";

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  const icon = document.createElement("div");
  icon.className = "project-thumbnail";

  const thumbnail = document.createElement("img");
  thumbnail.src = `https://picsum.photos/300/200?random=${project.id}`;
  thumbnail.alt = `Thumbnail for ${project.title} github project`;

  icon.appendChild(thumbnail);

  const title = document.createElement("h2");
  title.className = "project-title";
  title.textContent = project.name;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;

  const language = document.createElement("p");
  language.className = "project-language";
  language.textContent = `Language: ${project.language}`;

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.html_url;
  link.textContent = "GitHub repo";

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(language);
  card.appendChild(link);

  return card;
}


fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const projectContainer = document.getElementById("project-container");

    // Loop through the list of repositories
    data.slice(0, 9).forEach((repo) => {
      // Only display repositories that are not forks
      if (!repo.fork) {
        const projectCard = createProjectCard(repo);
        projectContainer.appendChild(projectCard);
      }
    });
  })
   
  .catch((error) => {
    console.error(error);
  });
 