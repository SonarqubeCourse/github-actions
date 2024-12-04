// Configuration for SonarQube API
const SONARQUBE_URL = 'https://qualitycode.meytel.cloud'; // Replace with your SonarQube URL
const API_TOKEN = 'Basic YS5vcnRlZ286UmVjZXN2aW50by4wNSQ='; // Replace with your SonarQube API token

// Function to get projects based on visibility filter
async function getProjects(visibility) {
  try {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Basic YS5vcnRlZ286UmVjZXN2aW50by4wNSQ="
     } 
     let response = await fetch("https://qualitycode.meytel.cloud/api/projects/search?visibility=public", { 
      method: "GET",
      headers: headersList
    });
   
    let data = await response.text();

    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.statusText}`);
    }

    // const data = await response.json();
      return data.projects; // Returns the list of projects
    } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Function to change the visibility of a project to private
async function setProjectVisibilityToPrivate(projectKey) {
  try {
    const response = await fetch(`https://qualitycode.meytel.cloud/api/projects/update_visibility`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        project: projectKey,
        visibility: 'private', // Set the visibility to private
      }),
    });

    if (!response.ok) {
      throw new Error(`Error changing visibility for project ${projectKey}: ${response.statusText}`);
    }

    console.log(`Project ${projectKey} visibility changed to private`);
  } catch (error) {
    console.error(`Error changing visibility for project ${projectKey}:`, error);
  }
}

// Main function to retrieve projects and change visibility to private
async function main() {
  // Fetch projects with a specific visibility filter (e.g., public)
  const projects = await getProjects('public'); // You can change this to 'internal' or 'private' as needed

  if (projects.length > 0) {
    // Iterate over each project and change its visibility to private
    for (let project of projects) {
      console.log(`Changing visibility for project: ${project.key}`);
      await setProjectVisibilityToPrivate(project.key);
    }
  } else {
    console.log('No projects found with the given visibility filter.');
  }
}

// Run the main function
main();
