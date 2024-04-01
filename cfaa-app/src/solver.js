// import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';



function Solver() {
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');
  const [compliant, setCompliance] = useState(true);



  const [computerType, setComputerType] = useState(null);
  const [havePassword, setHavePassword] = useState(null);
  const [intent, setIntent] = useState(null)
  const [infoAccessed, setInfoAccessed] = useState('');

  function checkCompliance(){
    setStatus('submitting');
    //run compliance check and
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
