
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeCommand = (command) => {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

const main = async () => {
  console.log('Setting up MongoDB Atlas...');

  // 1. Authenticate with MongoDB Atlas
  console.log('Please log in to your MongoDB Atlas account.');
  executeCommand('npx atlas login');

  // 2. Create a new project
  const projectName = 'SchoolManagement';
  console.log(`Creating new project: ${projectName}`);
  executeCommand(`npx atlas projects create ${projectName} --output json`);

  // 3. Create a new cluster
  const clusterName = 'SchoolManagementCluster';
  console.log(`Creating new cluster: ${clusterName}`);
  executeCommand(
    `npx atlas clusters create ${clusterName} --provider AWS --region US_EAST_1 --tier M0 --output json`
  );

  // 4. Create a new database user
  const dbUsername = 'schooladmin';
  const dbPassword = 'securepassword'; // In a real-world scenario, generate a secure password
  console.log(`Creating new database user: ${dbUsername}`);
  executeCommand(
    `npx atlas dbusers create --username ${dbUsername} --password ${dbPassword} --output json`
  );

  // 5. Get the connection string
  console.log('Retrieving connection string...');
  const connectionString = executeCommand(
    `npx atlas clusters connectionStrings describe ${clusterName} --output json`
  ).then((output) => {
    const connectionStrings = JSON.parse(output);
    return connectionStrings.standard_srv;
  });


  // 6. Update .env file
  console.log('Updating .env file with connection string...');
  const envContent = `MONGODB_URI=${connectionString}`;
  require('fs').writeFileSync('.env', envContent);

  console.log('MongoDB Atlas setup complete!');
  rl.close();
};

main();
