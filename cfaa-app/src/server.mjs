import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

// const fs = require('fs');
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
///////////////// Z3 CODE TO USE /////////////////////

app.post('/z3test', (req, res) => {

  const sourceFilePath = 'z3_translation/translation.smt-lib';
  const destinationFilePath = 'z3_translation/run.txt';
  const input_data = req.body.input;
  
  res.header("Access-Control-Allow-Origin", "*");
  console.log(input_data);

  //add the input data into the file we're going to run
  //we don't want to switch the original data
  fs.copyFileSync(sourceFilePath, destinationFilePath);
  //now, we need to append each line for every possible boolean and have an assertion counter
  let counter = 0;
  let appendAssertions = ``;

  //a1 --> knowingly access computer without authorization
  if(input_data.knowingly_access_comp_wo_auth != null){
    if(input_data.knowingly_access_comp_wo_auth == true){
      appendAssertions+=`(assert (! KnowinglyAccessesComputerWithoutAuthorization :named a1))\n`;
    } else{
      appendAssertions+=`(assert (! (not KnowinglyAccessesComputerWithoutAuthorization) :named a1))\n`;
    }
  }
  //a2 --> knowingly access comput
  if(input_data.knowingly_access_comp_exceeding_auth != null){
    if(input_data.knowingly_access_comp_exceeding_auth == true){
      appendAssertions+=`(assert (! KnowinglyAccessesComputerExceedingAuthorization :named a2))\n`;
    } else{
      appendAssertions+=`(assert (! (not KnowinglyAccessesComputerExceedingAuthorization) :named a2))\n`;
    }
  }

  //a3 --> info determined to require protection
  if(input_data.info_det_to_require_protection != null){
    if(input_data.info_det_to_require_protection == true){
      appendAssertions+=`(assert (! InformationDeterminedToRequireProtection :named a3))\n`;
    } else{
      appendAssertions+=`(assert (! (not InformationDeterminedToRequireProtection) :named a3))\n`;
    }
  }

  //a4 --> info can be used to injure US
  if(input_data.info_can_be_used_to_injure_US != null){
    if(input_data.info_can_be_used_to_injure_US == true){
      appendAssertions+=`(assert (! InformationCanBeUsedToInjureUS :named a4))\n`;
    } else{
      appendAssertions+=`(assert (! (not InformationCanBeUsedToInjureUS) :named a4))\n`;
    }
  }

  //a5 --> info can be used to advantage foreign nation
  if(input_data.info_can_be_used_to_advantage_foreign != null){
    if(input_data.info_can_be_used_to_advantage_foreign == true){
      appendAssertions+=`(assert (! InformationCanBeUsedToAdvantageForeignNation :named a5))\n`;
    } else{
      appendAssertions+=`(assert (! (not InformationCanBeUsedToAdvantageForeignNation) :named a5))\n`;
    }
  }

  //a6 --> communicates information to an unauthorized person
  if(input_data.communicates_info_to_unauth_person != null){
    if(input_data.communicates_info_to_unauth_person == true){
      appendAssertions+=`(assert (! CommunicatesInformationToUnauthorizedPerson :named a6))\n`;
    } else{
      appendAssertions+=`(assert (! (not CommunicatesInformationToUnauthorizedPerson) :named a6))\n`;
    }
  }

  //a7 --> fails to deliver to us entity
  if(input_data.fails_to_deliver_to_us_entity != null){
    if(input_data.fails_to_deliver_to_us_entity == true){
      appendAssertions+=`(assert (! FailedToDeliverToUSEntity :named a7))\n`;
    } else{
      appendAssertions+=`(assert (! (not FailedToDeliverToUSEntity) :named a7))\n`;
    }
  }  

  //a8 --> info contains financial record of financial institution
  if(input_data.contains_financial_record_of_financial_inst != null){
    if(input_data.contains_financial_record_of_financial_inst == true){
      appendAssertions+=`(assert (! ContainsFinancialRecordofFinancialInstitution :named a8))\n`;
    } else{
      appendAssertions+=`(assert (! (not ContainsFinancialRecordofFinancialInstitution) :named a8))\n`;
    }
  }  

  //a9 --> info contained in consumer reporting agency
  if(input_data.contained_in_consumer_reporting_agency != null){
    if(input_data.contained_in_consumer_reporting_agency == true){
      appendAssertions+=`(assert (! ContainedInConsumerReportingAgency :named a9))\n`;
    } else{
      appendAssertions+=`(assert (! (not ContainedInConsumerReportingAgency) :named a9))\n`;
    }
  }  

  //a10 --> info from protected computer
  if(input_data.info_from_protected_computer != null){
    if(input_data.info_from_protected_computer == true){
      appendAssertions+=`(assert (! InformationFromProtectedComputer :named a10))\n`;
    } else{
      appendAssertions+=`(assert (! (not InformationFromProtectedComputer) :named a10))\n`;
    }
  }  

  //a11 --> info from department or agency of us
  if(input_data.info_from_dep_or_agency_of_us != null){
    if(input_data.info_from_dep_or_agency_of_us == true){
      appendAssertions+=`(assert (! InformationFromDepartmentOrAgencyOfUS :named a11))\n`;
    } else{
      appendAssertions+=`(assert (! (not InformationFromDepartmentOrAgencyOfUS) :named a11))\n`;
    }
  }  

  //a12 --> intentionally accesses computer without authorization
  if(input_data.intentially_accesses_comp_wo_auth != null){
    if(input_data.intentially_accesses_comp_wo_auth == true){
      appendAssertions+=`(assert (! IntentionallyAccessesComputerWithoutAuthorization :named a12))\n`;
    } else{
      appendAssertions+=`(assert (! (not IntentionallyAccessesComputerWithoutAuthorization) :named a12))\n`;
    }
  } 

  //a13 --> non public computer of US department or agency
  if(input_data.non_public_computer_of_us_dept != null){
    if(input_data.non_public_computer_of_us_dept == true){
      appendAssertions+=`(assert (! NonpublicComputerOfUSDepartmentOrAgency :named a13))\n`;
    } else{
      appendAssertions+=`(assert (! (not NonpublicComputerOfUSDepartmentOrAgency) :named a13))\n`;
    }
  } 

  //a14 --> computer exclusively for government use
  if(input_data.computer_exclusive_for_gov_use != null){
    if(input_data.computer_exclusive_for_gov_use == true){
      appendAssertions+=`(assert (! ComputerExclusivelyForGovernmentUse :named a14))\n`;
    } else{
      appendAssertions+=`(assert (! (not ComputerExclusivelyForGovernmentUse) :named a14))\n`;
    }
  } 

  //a15 --> computer affects government use
  if(input_data.conduct_affects_gov_use != null){
    if(input_data.conduct_affects_gov_use == true){
      appendAssertions+=`(assert (! ConductAffectsGovernmentUse :named a15))\n`;
    } else{
      appendAssertions+=`(assert (! (not ConductAffectsGovernmentUse) :named a15))\n`;
    }
  } 

  //a16 --> intent to defraud 
  if(input_data.intent_to_defraud != null){
    if(input_data.intent_to_defraud == true){
      appendAssertions+=`(assert (! IntentToDefraud :named a16))\n`;
    } else{
      appendAssertions+=`(assert (! (not IntentToDefraud) :named a16))\n`;
    }
  } 

  //a17 --> intent to defraud 
  if(input_data.obtains_anything_of_value != null){
    if(input_data.obtains_anything_of_value == true){
      appendAssertions+=`(assert (! ObtainsAnythingOfValue :named a17))\n`;
    } else{
      appendAssertions+=`(assert (! (not ObtainsAnythingOfValue) :named a17))\n`;
    }
  } 

  //a18 --> object of fraud and only thing obtained is use of computer
  if(input_data.object_of_fraud_and_only_use_of_comp_obtained != null){
    if(input_data.object_of_fraud_and_only_use_of_comp_obtained == true){
      appendAssertions+=`(assert (! ObjectOfFraudAndThingObtainedOnlyUseOfComputer :named a18))\n`;
    } else{
      appendAssertions+=`(assert (! (not ObjectOfFraudAndThingObtainedOnlyUseOfComputer) :named a18))\n`;
    }
  } 

  // ;appending situation
  // (assert (! KnowinglyAccessesComputerWithoutAuthorization :named a1))
  // (assert (! (not KnowinglyAccessesComputerWithoutAuthorization) :named a2))

  appendAssertions+=`(assert (! (not NotCompliant) :named notComp))\n`;
  appendAssertions+=`(check-sat)\n`;
  fs.appendFileSync(destinationFilePath, appendAssertions);


  
  // run z3 script to check smt logic with given inputs
  const z3Process = spawn('z3',[destinationFilePath]);
  let stdoutData = '';
  // use stdout of python process as json result
  z3Process.stdout.on('data', (data) => {
    stdoutData += data.toString();
    console.log(stdoutData);
    // res.json(response)
  });

  z3Process.stderr.on('data', (data) => {
    console.error(`stderr from z3 process: ${data}`);
  });

  z3Process.on('close', (code) => {
    console.log(`z3 process exited with code ${code}`);
    let sat = stdoutData.toString().split("\n")[0];
    // console.log(sat);
    // let sat = stdoutData.toString();

    let response;
    if(sat == 'unsat'){
      console.log('returned unsat')
      response = {output: false};
    } else{
      console.log('returned sat')
      response = {output : true};
    }
    // fs.unlinkSync(destinationFilePath);

    // Return the stdout data as the response
    res.json(response);
  });

  // const output = { sum : sum};
  // const response = JSON.parse(output.toString());
  // res.json(output)

});


//////////////////END MY Z3 FUNCTION ///////////////////


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


});