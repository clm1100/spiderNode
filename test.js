// const { execFile } = require('child_process');
// const child = execFile('node', ['./app1.js'], (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });


const { exec } = require('child_process');
exec(`node app1.js ${"wqewewqeqeqeqewqewqe"}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});