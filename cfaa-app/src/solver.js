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
  const [compliant, setCompliance] = useState(true);

  //KnowinglyAccessesComputerWithoutAuthorization, intentionallyAccessesComputerWoAuth
  const [knowinglyAccessCompWoAuth, setKnowinglyAccessCompWoAuth] = useState(null);
  const [intentionallyAccessCompWoAuth, setIntentionallyAccessCompWoAuth] = useState(null);

  //KnowinglyAccessesComputerExceedingAuthorization
  const [knowinglyAccessCompExceedingAuth, setKnowinglyAccessCompExceedingAuth] = useState(null);

  //ComputerExclusivelyForGovernmentUse
  const [compExclusiveForGov, setCompExclusiveForGov] = useState(null);
  //NonpublicComputerOfUsDepartmentOrAgency
  const [nonpublicCompOfUsDep, setNonpublicCompOfUsDep] = useState(null);
  //is used for financial institution?
  const [compFinancialInst, setCompFinancialInst] = useState(null);

  //conduct affects government use
  const [conductAffectsGovUse, setConductAffectsGovUse] = useState(null);
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

  //use information
  const [communicatesInfoToUnauthPerson, setCommunicatesInfoToUnauthPerson] = useState(null);
  const [failsToDeliverToUsEntity, setFailsToDeliverToUsEntity]= useState(null);

  //fraud
  const [intentToDefraud, setIntentToDefraud]= useState(null);

  const [obtainsAnythingOfValue, setObtainsAnythingOfValue]= useState(null);
  const [objectOfFraudAndOnlyUseOfCompObtained, setObjectOfFraudAndOnlyUseOfCompObtained]= useState(null);
  const [valueOfUseGreaterThan5k, setValueOfUseGreaterThan5k]= useState(null);

  //knowingly transmit program/code
  const [knowinglyCausesTransmissionOfCode, setKnowinglyCausesTransmissionOfCode]= useState(null);
  const [transmissionCausesDamageWithoutAuthOfProtectedComp, setTransmissionCausesDamageWithoutAuthOfProtectedComp]= useState(null);
  const [conductResultsInDamageAndLoss, setConductResultsInDamageAndLoss]= useState(null);
  const [conductResultsInRecklessDamage, setConductResultsInRecklessDamage]= useState(null);
  
  useEffect(() => {
    console.log("Compliant updated:", compliant);
  }, [compliant]); // This useEffect will run whenever the 'compliant' state changes

  //when it's unsat, this function will give us the specific assertions that are violated
  function getNotCompliantAssertions(arr){
    let assertionsStr = "The combination of the following actions in conjuction imply that you've broken the CFAA:\n";
    if(arr.includes('a1')){
      assertionsStr+= "-You cannot knowingly access a computer without authorization.\n";
    }
    if(arr.includes('a2')){
      assertionsStr+= "-You cannot knowingly exceed authorized access to a computer.\n";
    }
    if(arr.includes('a3')){
      assertionsStr+= "-You cannot access information that has been determined to require protection by the government.\n";
    }
    if(arr.includes('a4')){
      assertionsStr+= "-You cannot access information that can be used to injure the United States.\n";
    }
    if(arr.includes('a5')){
      assertionsStr+= "-You cannot access information that can be used to advantage a foreign nation. \n";
    }
    if(arr.includes('a6')){
      assertionsStr+= "-You cannot communicate the obtained information with an unauthorized person.\n";
    }
    if(arr.includes('a7')){
      assertionsStr+= "-Your actions resulted in important information failing to be delivered to a US entity. \n";
    }
    if(arr.includes('a8')){
      assertionsStr+= "-You cannot access information that contains financial records of financial institutions.\n";
    }
    if(arr.includes('a9')){
      assertionsStr+= "-You cannot access information contained in the File of a consumer reporting agency.\n";
    }
    if(arr.includes('a10')){
      assertionsStr+= "-You cannot access information from a Protected Computer (see http://bit.ly/3wfNIwF).\n";
    }
    if(arr.includes('a11')){
      assertionsStr+= "-You cannot access information from a US Department or Agency. \n";
    }
    if(arr.includes('a12')){
      assertionsStr+= "-You cannot intentionally access a computer without authorization.\n";
    }
    if(arr.includes('a13')){
      assertionsStr+= "-You cannot access a non-public computer of a US department or Agency.\n";
    }
    if(arr.includes('a14')){
      assertionsStr+= "-You cannot access a computer exclusively for government use.\n";
    }
    if(arr.includes('a15')){
      assertionsStr+= "-Your conduct affected the government/financial use of a computer.\n";
    }
    if(arr.includes('a16')){
      assertionsStr+= "-You cannot intend to defraud someone using a computer.\n";
    }
    if(arr.includes('a17')){
      assertionsStr+= "-You cannot obtain anything of monetary value from committing fraud.\n";
    }
    if(arr.includes('a18')){
      assertionsStr+= "-You obtained the use of the computer through committing fraud.\n";
    }
    if(arr.includes('a19')){
      assertionsStr+= "-You obtained more than $5000 worth of value through your computer use while committing fraud.\n";
    }
    if(arr.includes('a20')){
      assertionsStr+= "-You knowingly caused the transmission of a program, code, or  information to a protected computer.\n";
    }
    if(arr.includes('a21')){
      assertionsStr+= "-Your transmission of a program, code, or information without authorization of a protected computer caused damage.\n";
    }
    if(arr.includes('a22')){
      assertionsStr+= "-Your conduct resulted in damage and loss.\n";
    }
    if(arr.includes('a23')){
      assertionsStr+= "-Your conduct resulted in reckless damage.\n";
    }
    if(arr.includes('a24')){
      assertionsStr+= "-You accessed a protected computer.\n";
    }

    return assertionsStr;
  }



  const fetchDataAndUpdateCompliance = async (endpoint, input) => {
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
      console.log(jsonData);
      setCompliance(jsonData.output);
      // update compliance and output :
      if(jsonData.output){
        const comp_output = 
          <>
            <span style={{color: 'white'}}> The inputted situation is compliant with the CFAA. </span>
          </>;
        setOutput(comp_output);
      } else{
        const assertions_broken = getNotCompliantAssertions(jsonData.unsat_core)
        const not_compliant = 
          <>
            <span style={{color: 'red'}}> The inputted siutation <strong>breaks</strong> the CFAA. </span>
            <br/>
            <div> 
              {assertions_broken.split('\n').map((assertion, index) => {
                return <p key={index}>{assertion}</p>;
              })}
            </div>
          </>;
        setOutput(not_compliant);
      }



    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  // COMPLIANCE CHECK HERE
  function checkCompliance(){
    setStatus('submitting');

    //TODO: confirm this!!
    const infoFromProtectedComputer = (obtainedInfo && isProtectedComputer);
    //create json input
    const input_vals = {
        knowingly_access_comp_wo_auth: knowinglyAccessCompWoAuth,
        knowingly_access_comp_exceeding_auth: knowinglyAccessCompExceedingAuth,
        info_det_to_require_protection: informationDeterminedToRequireProtection,
        info_can_be_used_to_injure_US: informationCanBeUsedToInjureUS,
        info_can_be_used_to_advantage_foreign: informationCanBeUsedToAdvantageForeignNation,
        communicates_info_to_unauth_person: communicatesInfoToUnauthPerson,
        fails_to_deliver_to_us_entity: failsToDeliverToUsEntity, 
        contains_financial_record_of_financial_inst: containsFinancialRecordofFinancialInstitution,
        contained_in_consumer_reporting_agency: containedInConsumerReportingAgency,
        info_from_protected_computer: infoFromProtectedComputer,
        info_from_dep_or_agency_of_us: infoFromDeptOrAgencyOfUS,
        intentially_accesses_comp_wo_auth: intentionallyAccessCompWoAuth,
        non_public_computer_of_us_dept: nonpublicCompOfUsDep,
        computer_exclusive_for_gov_use: compExclusiveForGov,
        conduct_affects_gov_use: conductAffectsGovUse,
        intent_to_defraud: intentToDefraud,
        obtains_anything_of_value: obtainsAnythingOfValue,
        object_of_fraud_and_only_use_of_comp_obtained: objectOfFraudAndOnlyUseOfCompObtained,
        value_of_use_greater_than_5k :valueOfUseGreaterThan5k,
        knowingly_cases_trasnmission_of_code: knowinglyCausesTransmissionOfCode,
        transmission_cases_damage_wo_auth_protected_comp: transmissionCausesDamageWithoutAuthOfProtectedComp,
        conduct_results_in_damage_and_loss: conductResultsInDamageAndLoss,
        conduct_results_in_reckless_damage: conductResultsInRecklessDamage,
        is_protected_computer: isProtectedComputer
    };

    fetchDataAndUpdateCompliance(ENDPOINT, input_vals);

  }
  
  //set KnowinglyAccessesComputerWithoutAuthorization
  //QUESTION 1 HANDLE
  function handleKnowinglyAccessCompWoAuth(e){
    if(e.target.value == "1"){
      setKnowinglyAccessCompWoAuth(true);
      setIntentionallyAccessCompWoAuth(true);
    } else{
      setKnowinglyAccessCompWoAuth(false);
      setIntentionallyAccessCompWoAuth(false);
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
      setCompFinancialInst(null);

    } else if(e.target.value == "pub"){
      setNonpublicCompOfUsDep(false);
      setCompExclusiveForGov(false);
      setCompFinancialInst(false);

    } else if(e.target.value == "fin"){
      setCompFinancialInst(true);
      setCompExclusiveForGov(null);
      setNonpublicCompOfUsDep(null);

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
      setConductAffectsGovUse(true);
      setIsProtectedComputer(true);
    } else if(e.target.value == "2"){
      setConductAffectsGovUse(false);
      setIsProtectedComputer(false);
      setConductResultsInRecklessDamage(null);
      setConductResultsInDamageAndLoss(null);

    } else{
      setConductAffectsGovUse(null);
      setIsProtectedComputer(null);
      setConductResultsInRecklessDamage(null);
      setConductResultsInDamageAndLoss(null);
    }
  }

  // <option value="1">Yes, it recklessly caused damage</option>
  // <option value="2">Yes, it caused damage and loss</option>
  // <option value="3">No</option>
  //question 5 handle
  function handleCausedDamage(e){
    if(e.target.value == "1"){
      setConductResultsInRecklessDamage(true);
      setConductResultsInDamageAndLoss(false);
    } else if(e.target.value == "2"){
      setConductResultsInRecklessDamage(false);
      setConductResultsInDamageAndLoss(true);

    } else if(e.target.value == "3"){
      setConductResultsInRecklessDamage(false);
      setConductResultsInDamageAndLoss(false);
    } else{
      setConductResultsInRecklessDamage(null);
      setConductResultsInDamageAndLoss(null);

    }
  }

  //question 6 handle
  function handleObtainedInfo(e){
    if(e.target.value == "1"){
      setObtainedInfo(true);
    } else{
      setObtainedInfo(false);
    }
  }

  //question 7 handle
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
      setInformationCanBeUsedToInjureUS(null);
      setInformationCanBeUsedToAdvantageForeignNation(null);
      setContainsFinancialRecordofFinancialInstitution(null);
      setContainedInConsumerReportingAgency(null);
      setinfoFromDeptOrAgencyOfUS(null);
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
      setinfoFromDeptOrAgencyOfUS(true);
    } else if(e.target.value == "7"){
      //ALL FALSE?
      setInformationDeterminedToRequireProtection(false);
      setInformationCanBeUsedToInjureUS(false);
      setInformationCanBeUsedToAdvantageForeignNation(false);      
      setContainsFinancialRecordofFinancialInstitution(false);
      setContainedInConsumerReportingAgency(false);
      setinfoFromDeptOrAgencyOfUS(false);
    }
  }

  //question 8 handle
  function handleSharedInformation(e){
    if(e.target.value == "1"){
      setCommunicatesInfoToUnauthPerson(true);
    } else if(e.target.value == "2"){
      setCommunicatesInfoToUnauthPerson(false);
    } else{
      setCommunicatesInfoToUnauthPerson(null);
    }
  }

  //question 9 handle
  function handlePreventedInfoDelivery(e){
    if(e.target.value == "1"){
      setFailsToDeliverToUsEntity(true);
    } else if(e.target.value == "2"){
      setFailsToDeliverToUsEntity(false);
    } else{
      setFailsToDeliverToUsEntity(null);
    }
  }

  //question 10 handle
  function handleIntentToDefraud(e){
    if(e.target.value == "1"){
      setIntentToDefraud(true);
    } else if(e.target.value == "2"){
      setIntentToDefraud(false);
      // questions reliant on fraud
      setObjectOfFraudAndOnlyUseOfCompObtained(null);
      setObtainsAnythingOfValue(null);
      setValueOfUseGreaterThan5k(null);

    } else{
      setIntentToDefraud(null);
      setObjectOfFraudAndOnlyUseOfCompObtained(null);
      setObtainsAnythingOfValue(null);
      setValueOfUseGreaterThan5k(null);
    }
  }

  //question 11 handle
  function handleObtainsValue(e){
    if(e.target.value == "1"){
      setObtainsAnythingOfValue(true);
      setObjectOfFraudAndOnlyUseOfCompObtained(false);
      setValueOfUseGreaterThan5k(null);
    } else if(e.target.value == "2"){
      setObjectOfFraudAndOnlyUseOfCompObtained(true);
      setObtainsAnythingOfValue(false);
    } else{
      setObtainsAnythingOfValue(null);
      setObjectOfFraudAndOnlyUseOfCompObtained(null);
      setValueOfUseGreaterThan5k(null);
    }
  }

  //question 12 handle
  function handleFraudUseMoreThan5k(e){
    if(e.target.value == "1"){
      setValueOfUseGreaterThan5k(true);
    } else if(e.target.vale == "2"){
      setValueOfUseGreaterThan5k(false);
    } else{
      setValueOfUseGreaterThan5k(null);
    }
  }


  //question 13 handle
  function handleTransmissionOfProgram(e){
    if(e.target.value == "1"){
      setKnowinglyCausesTransmissionOfCode(true);
      setTransmissionCausesDamageWithoutAuthOfProtectedComp(true);
    } else if(e.target.vale == "2"){
      setKnowinglyCausesTransmissionOfCode(false);
      setTransmissionCausesDamageWithoutAuthOfProtectedComp(false);
    } else{
      setKnowinglyCausesTransmissionOfCode(null);
      setTransmissionCausesDamageWithoutAuthOfProtectedComp(null);
    }
  }

//-------------------

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
            {/* optional – did you access a computer??: */}
            {/* QUESTION 3 */}
            {(knowinglyAccessCompWoAuth || knowinglyAccessCompExceedingAuth) && <ListGroup.Item style={{backgroundColor: "gray"}}>
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
              </ListGroup.Item>}


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

              {/* (optional – only if it's a protected computer)  */}
              {/*  did conduct cause damage */}
              {/*  QUESTION 5 */}
              {isProtectedComputer && (knowinglyAccessCompExceedingAuth || knowinglyAccessCompExceedingAuth) && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> In the computer you accessed, did your conduct cause damage?  </span>
                <div style={{float: "right"}}>
                  {/* NEED TO CHANGE VALUES TO SMT READABLE */}
                  <Form.Select aria-label="Default select example" onChange = {handleCausedDamage}>
                    <option>Select</option>
                    <option value="1">Yes, it recklessly caused damage</option>
                    <option value="2">Yes, it caused damage and loss</option>
                    <option value="3">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}

              {/* obtained any information? */}
              {/* QUESTION 6 */}
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
              {/* QUESTION 7 */}
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
                    <option value="5">Info that's contained in a file of consumer reporting agency</option>
                    <option value="6">Info From US Department or Agency</option>
                    <option value="7">None of the above</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}

              {/* OPTIONAL – only if inobtained info was shared  */}
              {/* QUESTION 8 */}
             {obtainedInfo && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you share the information with any unauthorized people?  </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleSharedInformation}>
                    <option>Select</option>
                    <option value="1">Yes </option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}


              {/* OPTIONAL – only if inobtained info was shared  */}
              {/* QUESTION 9 */}
             {obtainedInfo && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did your actions prevent the delivery of information to a US entity?</span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handlePreventedInfoDelivery}>
                    <option>Select</option>
                    <option value="1">Yes </option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}

              {/* attempt to defraud when accessing computer */}
              {/* QUESTION 10 */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you have intent to commit fraud when accessing the computer? </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleIntentToDefraud}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>

              {/* OPTIONAL –obtain anything of monetary value through fraud */}
              {/* QUESTION 11 */}
              {intentToDefraud && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you obtain anything of monetary value through the fraud? </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleObtainsValue}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No, just the use of the computer</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}

              {/* OPTIONAL – value of fraud computer use more than $5k */}
              {/* QUESTION 12 */}
              {objectOfFraudAndOnlyUseOfCompObtained && <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Was the value of your computer use worth more than $5000? </span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleFraudUseMoreThan5k}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>}


              {/* cause transmission of program, which caused damage*/}
              {/* QUESTION 13 */}
              <ListGroup.Item style={{backgroundColor: "gray"}}>
                <span style={{float: "left"}}> Did you knowingly cause the transmission of a program, information, or code to a protected computer and did it cause damage?</span>
                <div style={{float: "right"}}>
                  {/* <Button> Select Options Here </Button> */}
                  <Form.Select aria-label="Default select example" onChange = {handleTransmissionOfProgram}>
                    <option>Select</option>
                    {/* TO DO: CHECK THESE ANSWERS, do we want to pull out protected computer from here???? */}
                    <option value="1">Yes </option>
                    <option value="2">No</option>
                  </Form.Select>
                </div>
              </ListGroup.Item>


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
          {/* Computer type: {computerType}, Have Password?: {havePassword}, intent: {intent}, info accessed: {infoAccessed} */}
        </div>
      </div>
    </div>
  );
}

export default Solver;
