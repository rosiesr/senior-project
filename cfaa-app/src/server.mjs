import express from "express";
import cors from "cors";

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
  const pythonProcess = spawn('python',[__dirname, "./z3_solver.py", JSON.stringify(input_data)]);

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

app.post('/pythontest', (req, res) => {
  const input_data = req.body.input;
  const sum = input_data.first_num + input_data.second_num;
  res.header("Access-Control-Allow-Origin", "*");

  const output = { sum : sum};
  // const response = JSON.parse(output.toString());
  res.json(output)

  //run python script to check smt logic with given inputs
  // const pythonProcess = spawn('python',[__dirname, "./z3_solver.py", JSON.stringify(input_data)]);

  //use stdout of python process as json result
  // pythonProcess.stdout.on("output", (output) => {
  //   const response = JSON.parse(output.toString());
  //   res.json(response)
  // });

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