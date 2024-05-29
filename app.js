async function getPublicRepositories(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Failed to fetch repositories:', response.statusText);
        return [];
    }
}

const EXCLUDED_REPOS = ["mukoshi", "mukoshi.github.io"]; // İstemediğiniz repo isimleri

function filterRepositories(repositories, excludedRepos) {
    return repositories.filter(repo => !excludedRepos.includes(repo.name));
}

function displayRepositories(repositories) {
    const projectsList = document.getElementById('projects');
    projectsList.innerHTML = '';
    repositories.forEach(repo => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.textContent = repo.name;
        listItem.appendChild(link);
        projectsList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const username = 'mukoshi';
    const repositories = await getPublicRepositories(username);
    const filteredRepositories = filterRepositories(repositories, EXCLUDED_REPOS);
    displayRepositories(filteredRepositories);
});