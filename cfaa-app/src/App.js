// import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




function App() {
  return (
    <div className="App">
      <header className="App-header">
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
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example">
                    <option>Select</option>
                    <option value="1">Personal computer</option>
                    <option value="2">Government Computer</option>
                    <option value="3">Employer Computer (non government)</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* second question */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you have the appropriate password/authentication to access the information?  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example">
                    <option>Select</option>
                    <option value="1">No, I hacked into it</option>
                    <option value="2">Yes, it was given to me.</option>
                    <option value="3">Other</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* third question */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What was your intent in accessing the computer?  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example">
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
                  <Form.Select aria-label="Default select example">
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
          <Button variant="primary" style={{float: "right"}}>Check Compliance</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
