import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";

// const { express } = require('express');
// const { cors} = require('cors');
// const { spawn } = require('child_process');
// const {path } = require('path');

const app = express();
const port = 2000;
// const { spawn } = require("child_process");
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to server');
});

app.post('/check', (req, res) => {
  const input_data = req.body;
  res.send('hit the test endpoint!');

  //run python script to check smt logic with given inputs
  const currentModuleDirectory = path.dirname(require.main.filename);
  const pythonPath = path.join(currentModuleDirectory, 'z3_solver.py');
  const pythonProcess = spawn('python', [pythonPath, JSON.stringify(input_data)]);

  //use stdout of python process as json result
  pythonProcess.stdout.on("output", (output) => {
    const response = JSON.parse(output.toString());
    res.json(response)
  });

});

app.post('/inputtest', (req, res) => {
  const input_data = req.body.input;
  const sum = input_data.first_num + input_data.second_num;
  res.header("Access-Control-Allow-Origin", "*");

  const output = { sum : sum};
  res.json(output)
});

app.post('/z3test', (req, res) => {
  const input_data = req.body.input;
  
  res.header("Access-Control-Allow-Origin", "*");

  console.log(input_data);

  //set path
  // const currentModuleDirectory = path.dirname(process.argv[1]);
  // const z3path = path.join(currentModuleDirectory, './translation.smt-lib');
  
  // run python script to check smt logic with given inputs
  const z3Process = spawn('z3',['z3_translation/translation.smt-lib']);
  let stdoutData = ''
  // use stdout of python process as json result
  z3Process.stdout.on('data', (data) => {
    stdoutData += data.toString();
    console.log(stdoutData);
    // res.json(response)
  });

  z3Process.stderr.on('data', (data) => {
    console.error(`stderr from Python process: ${data}`);
  });

  z3Process.on('close', (code) => {
    console.log(`z3 process exited with code ${code}`);
    let sat = stdoutData.toString().split("\n")[0];
    let response;
    if(sat == 'unsat'){
      response = {output: false};
    } else{
      response = {output : true};
    }
    // Return the stdout data as the response
    res.json(response);
  });

  // const output = { sum : sum};
  // const response = JSON.parse(output.toString());
  // res.json(output)

});

app.post('/pythontest', (req, res) => {
  const input_data = req.body.input;
  
  res.header("Access-Control-Allow-Origin", "*");

  console.log(input_data);

  //set path
  const currentModuleDirectory = path.dirname(process.argv[1]);
  const pythonPath = path.join(currentModuleDirectory, './mypythontest.py');
  
  // run python script to check smt logic with given inputs
  const pythonProcess = spawn('python',[pythonPath, JSON.stringify(input_data)]);
  let stdoutData = ''
  // use stdout of python process as json result
  pythonProcess.stdout.on('data', (data) => {
    stdoutData += data.toString();
    // res.json(response)
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr from Python process: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    // console.log(`std output contians ${stdoutData}`);

    // Return the stdout data as the response
    const response = JSON.parse(stdoutData.toString());
    res.json(response);
  });

  // const output = { sum : sum};
  // const response = JSON.parse(output.toString());
  // res.json(output)

});

app.post('/gettest', (req, res) => {
  const input_data = req.body;
  // res.send('with input');
  res.header("Access-Control-Allow-Origin", "*");

  const output = { dummy : true};
  // const response = JSON.parse(output.toString());
  res.json(output)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});