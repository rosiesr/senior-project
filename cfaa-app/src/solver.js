// import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

const ENDPOINT = 'http://localhost:2000/z3test';

function Solver() {
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');
  const [compliant, setCompliance] = useState(false);

  //KnowinglyAccessesComputerWithoutAuthorization
  const [knowinglyAccessCompWoAuth, setKnowinglyAccessCompWoAuth] = useState(null);
  //KnowinglyAccessesComputerExceedingAuthorization
  const [knowinglyAccessCompExceedingAuth, setKnowinglyAccessCompExceedingAuth] = useState(null);

  //ComputerExclusivelyForGovernmentUse
  const [compExclusiveForGov, setCompExclusiveForGov] = useState(null);
  //NonpublicComputerOfUsDepartmentOrAgency
  const [nonpublicCompOfUsDep, setNonpublicCompOfUsDep] = useState(false);
  //is used for financial institution?
  const [compFinancialInst, setCompFinancialInst] = useState(null);

  //conduct affects government use
  const [compAffectsGovUse, setCompAffectsGovUse] = useState(null);
  //protected computer
  const [isProtectedComputer, setIsProtectedComputer] = useState(null);

  //obtained information?
  const [obtainedInfo, setObtainedInfo] = useState(null);

  //info determined to require protetion?
  const [informationDeterminedToRequireProtection, setInformationDeterminedToRequireProtection] = useState(null);
  const [informationCanBeUsedToInjureUS, setInformationCanBeUsedToInjureUS] = useState(null);
  const [informationCanBeUsedToAdvantageForeignNation, setInformationCanBeUsedToAdvantageForeignNation] = useState(null);
  const [containsFinancialRecordofFinancialInstitution, setContainsFinancialRecordofFinancialInstitution] = useState(null);
  const [containedInConsumerReportingAgency, setContainedInConsumerReportingAgency] = useState(null);
  const [infoFromDeptOrAgencyOfUS, setinfoFromDeptOrAgencyOfUS] = useState(null);



  const [computerType, setComputerType] = useState(null);
  const [havePassword, setHavePassword] = useState(null);
  const [intent, setIntent] = useState(0)
  const [infoAccessed, setInfoAccessed] = useState(0);

  
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

      console.log("hit end point");
      console.log("endpoint returned: " );
      const jsonData = await response.json();
      console.log(jsonData.output);

      // setCompliance(jsonData.sum);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  
  function checkCompliance(){
    setStatus('submitting');
    //create json input
    const input_vals = {
        knowingly_access_comp_wo_auth: knowinglyAccessCompWoAuth,
        first_num: intent,
        second_num: infoAccessed
    };

    fetchData(ENDPOINT, input_vals);
    console.log("after fetch logging compliance -");
    // console.log(compliant);
    


    // setCompliance = runLogic()
    if(compliant){
      const comp_output = "will run compliance check on the inputted parameters";
      setOutput(comp_output);
    } else{
      const not_compliant = <span style={{color: 'blue'}}> not compliant test </span>;
      setOutput(not_compliant);
    }
  }
  
  //set KnowinglyAccessesComputerWithoutAuthorization
  //QUESTION 1 HANDLE
  function handleKnowinglyAccessCompWoAuth(e){
    if(e.target.value == "1"){
      setKnowinglyAccessCompWoAuth(true);
    } else{
      setKnowinglyAccessCompWoAuth(false);
    }
  }

  //set handleKnowinglyAccessCompExceedingAuth
  //QUESTION 2 HANDLE
  function handleKnowinglyAccessCompExceedingAuth(e){
    if(e.target.value == "1"){
      setKnowinglyAccessCompExceedingAuth(true);
    } else {
      setKnowinglyAccessCompExceedingAuth(false);
    }
    // setKnowinglyAccessCompExceedingAuth(Boolean(e.target.value));
  }

  //QUESTION 3 HANDLE
  function handleComputerType(e){
    if(e.target.value == "gov"){
      setCompExclusiveForGov(true);
      setNonpublicCompOfUsDep(true);
      setCompFinancialInst(false);

    } else if(e.target.value == "pub"){
      setNonpublicCompOfUsDep(false);
      setCompExclusiveForGov(false);
      setCompFinancialInst(false);

    } else if(e.target.value == "fin"){
      setCompFinancialInst(true);
      setCompExclusiveForGov(false);
      setNonpublicCompOfUsDep(false);

      //set up for protected computer
    } else if(e.target.value == "non"){
      //skip, since default is false everywhere
      setCompExclusiveForGov(false);
      setNonpublicCompOfUsDep(false);
      setCompFinancialInst(false);

    }
    else if(e.target.value =="oth"){
      //TO DO: IF NO COMPUTER IS ACCESSED, UPDATE SOMETHING TO KEEP TRACK (I.E. SKIP TO FRAUD)
    }
    // setKnowinglyAccessCompExceedingAuth(Boolean(e.target.value));
  }

  //question 4 handle
  function handleConductAffectQ(e){
    if(e.target.value == "1"){
      setCompAffectsGovUse(true);
      setIsProtectedComputer(true);
    } else {
      setCompAffectsGovUse(false);
      setIsProtectedComputer(false);
    }
  }

  //question 5 handle
  function handleObtainedInfo(e){
    if(e.target.value == "1"){
      setObtainedInfo(true);
    } else{
      setObtainedInfo(false);
    }
  }

  //question 6 handle
  // <option value="1">Info required by statue or exec order to require protection</option>
  // <option value="2">Info that can be used to Injure US</option>
  // <option value="3">Info that can be used to advantage foreign nations</option>
  // <option value="4">Info that contains financial record of financial institution </option>
  // <option value="5">Info that's contained in fire of consumer reporting agency</option>
  // <option value="6">Info From US Department or Agency</option>
  //TO DO MAKE THIS MULTISELECT
  function handleObtainedInfoType(e){
    if(e.target.value == "1"){
      //REQUIRE PROTECTION
      setInformationDeterminedToRequireProtection(true);
      setInformationCanBeUsedToInjureUS(false);
      setInformationCanBeUsedToAdvantageForeignNation(false);
      setContainsFinancialRecordofFinancialInstitution(false);
      setContainedInConsumerReportingAgency(false);
      setinfoFromDeptOrAgencyOfUS(false);
    } else if(e.target.value == "2"){
      setInformationDeterminedToRequireProtection(false);
      //INJURE US
      setInformationCanBeUsedToInjureUS(true);
      setInformationCanBeUsedToAdvantageForeignNation(false);
      setContainsFinancialRecordofFinancialInstitution(false);
      setContainedInConsumerReportingAgency(false);
      setinfoFromDeptOrAgencyOfUS(false);


    } else if(e.target.value == "3"){
      setInformationDeterminedToRequireProtection(false)
      setInformationCanBeUsedToInjureUS(false);
      //ADVANTAGE FOREIGN
      setInformationCanBeUsedToAdvantageForeignNation(true);
      setContainsFinancialRecordofFinancialInstitution(false);
      setContainedInConsumerReportingAgency(false);
      setinfoFromDeptOrAgencyOfUS(false);

    } else if(e.target.value == "4"){
      setInformationDeterminedToRequireProtection(false);
      setInformationCanBeUsedToInjureUS(false);
      setInformationCanBeUsedToAdvantageForeignNation(false);
      //FINANCIAL RECORD
      setContainsFinancialRecordofFinancialInstitution(true);
      setContainedInConsumerReportingAgency(false);
      setinfoFromDeptOrAgencyOfUS(false);


    } else if(e.target.value == "5"){
      setInformationDeterminedToRequireProtection(false);
      setInformationCanBeUsedToInjureUS(false);
      setInformationCanBeUsedToAdvantageForeignNation(false);
      setContainsFinancialRecordofFinancialInstitution(false);
      //CONSUMER REPORTING
      setContainedInConsumerReportingAgency(true);
      setinfoFromDeptOrAgencyOfUS(false);

    } else if(e.target.value == "6"){
      setInformationDeterminedToRequireProtection(false);
      setInformationCanBeUsedToInjureUS(false);
      setInformationCanBeUsedToAdvantageForeignNation(false);      
      setContainsFinancialRecordofFinancialInstitution(false);
      setContainedInConsumerReportingAgency(false);
      //info from us department
      setinfoFromDeptOrAgencyOfUS(false);


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
      <div className="App-header" style={{margin: "16px"}}>
        <h1>
          Computer Fraud and Abuse Act SMT Solver
        </h1>
        <p style={{fontSize: "12pt"}}> Congress enacted the CFAA in 1986 to federally prosecute crimes of hacking. The law has been amended 6 times to broaden its scope. This tool
          can help users better understand what actions are legal under the law.
        </p>
        <p style={{width: "90%", textAlign: "left"}}> Insert the details of the situation below: </p>
        <Card bg="white" style={{width: "95%"}}>
            <ListGroup>

              {/* KNOWINGLY ACCESS WO AUTH */}
              {/* QUESTION 1 */}
            <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you knowingly or intentionally access a computer you didn’t have authorization for? </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleKnowinglyAccessCompWoAuth}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

            {/* KNOWINGLY ACCESS EXCEEDING AUTH */}
            {/* QUESTION 2 */}
            <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you knowingly access a computer that you had authorization for but exceeded the scope of the authorization? </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleKnowinglyAccessCompExceedingAuth}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

            {/* what kind of computer did you access */}
            {/* QUESTION 3 */}
            <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What kind of computer did you access? </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleComputerType}>
                    <option>Select</option>
                    <option value="gov"> Computer Exclusive for Government</option>
                    <option value="pub">Public Computer used by Government</option>
                    <option value="fin">Finacial Institution Computer</option>
                    <option value="non">Non-Government/Non-Finaicial Computer</option>
                    <option value="oth">Didn't Access a Computer</option>

                  </Form.Select>
                </div>
              </ListGroup.Item>


              {/* (optional – only if it's a public computer)  */}
              {/* TO DO: doesn't disappear if prior question on select, maybe we change styling */}
              {/*  QUESTION 4 */}
              {compFinancialInst == false && compExclusiveForGov == false && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}>  If the computer is not exclusively used by the government or financial institution, did the conduct of the situation affect the government/financial use?  </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleConductAffectQ}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}

              {/* obtained any information? */}
              {/* QUESTION 5 */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you obtain information as a result of accessing the computer?  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleObtainedInfo}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* OPTIONAL – only if obtained info */}
              {/* obtained any information? */}
              {/* QUESTION 6 */}
              {obtainedInfo && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What kind of information did you obtain (check boxes?)  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleObtainedInfoType}>
                    <option>Select</option>
                    <option value="1">Info required by statue or exec order to require protection</option>
                    <option value="2">Info that can be used to Injure US</option>
                    <option value="3">Info that can be used to advantage foreign nations</option>
                    <option value="4">Info that contains financial record of financial institution </option>
                    <option value="5">Info that's contained in fire of consumer reporting agency</option>
                    <option value="6">Info From US Department or Agency</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}


              {/* fourth question */}
              {/* <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> What kind of information was accessed?  </span>
                <div style={{float: "right"}}>
                  <Form.Select aria-label="Default select example" onChange = {handleInfoAccessChange}>
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </ListGroup.Item> */}

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
