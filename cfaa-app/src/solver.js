// import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

const ENDPOINT = 'http://localhost:2000/inputtest';

function Solver() {
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');
  const [compliant, setCompliance] = useState('intial state');



  const [computerType, setComputerType] = useState(null);
  const [havePassword, setHavePassword] = useState(null);
  const [intent, setIntent] = useState(null)
  const [infoAccessed, setInfoAccessed] = useState('');

  
  useEffect(() => {
    console.log("Compliant updated:", compliant);
  }, [compliant]); // This useEffect will run whenever the 'compliant' state changes

  const fetchData = async (endpoint, input) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({input})
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      console.log("hit end point");
      console.log("endpoint returned: " );
      // console.log(jsonData.dummy);

      setCompliance(jsonData.sum);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  
  function checkCompliance(){
    setStatus('submitting');
    //create json input
    const input_vals = {
        first_num: 2,
        second_num: 5
    };

    fetchData(ENDPOINT, input_vals);
    console.log("after fetch logging compliance -");
    // console.log(compliant);




    // const response = await fetch("http://localhost:2000/test", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
    //   .then(response => response.json());

    // fetch("http://localhost:2000/test", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(input_vals),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setCompliance(data.output)
    //     // if(data.output == "Unsat"){
    //     //   setCompliance(true);
    //     // } else{
    //     //   setCompliance(false);
    //     // }
    //   })
    


    // setCompliance = runLogic()
    if(compliant){
      setOutput('will run compliance check on the inputted parameters');
    } else{
      setOutput('will run compliance check on the inputted parameters');
    }
  }

  function handleCompTypeChange(e){
    setComputerType(e.target.value);
  }

  function handleHavePasswordChange(e){
    setHavePassword(e.target.value);
  }

  function handleIntentChange(e){
    setIntent(e.target.value);
  }

  function handleInfoAccessChange(e){
    setInfoAccessed(e.target.value);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>
          Computer Fraud and Abuse Act SMT Solver
        </h1>
        <p style={{width: "90%", textAlign: "left"}}> Insert the Situation: </p>
        <Card bg="white" style={{width: "95%"}}>
            <ListGroup>

              {/* first question */}
            <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What kind of computer was accessed?  </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleCompTypeChange}>
                    <option>Select</option>
                    <option value="personal computer">Personal computer</option>
                    <option value="government computer">Government Computer</option>
                    <option value="employer computer">Employer Computer (non government)</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* second question */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you have the appropriate password/authentication to access the information?  </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleHavePasswordChange}>
                    <option>Select</option>
                    <option value="false">No, I hacked into it</option>
                    <option value="true">Yes, it was given to me.</option>
                    <option value="N/A">Other</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* third question */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What was your intent in accessing the computer?  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleIntentChange}>
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* fourth question */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What kind of information was accessed?  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleInfoAccessChange}>
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

            </ListGroup>
        </Card>
        <br/>
        <div style={{width: "90%"}}>
            {/* <Button variant="primary" style={{float: "right"}}>Check Compliance</Button> */}
          <Button variant="primary" onClick={checkCompliance} style={{float: "right"}}>Check Compliance</Button>
        </div>
        <div>
          <br/>
          {output}
          <br/>
          {/* JUST FOR DEVELOPING – WHAT'S CURRENT STATE */}
          Computer type: {computerType}, Have Password?: {havePassword}, intent: {intent}, info accessed: {infoAccessed}
        </div>
      </div>
    </div>
  );
}

export default Solver;
