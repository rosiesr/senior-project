# senior-project
This is my repository for CPSC 490, Yale's senior Project. I translated the Computer Fraud and Abuse Act (CFAA) into logic and created a React web app, were you can input various scenarios and the app will tell you whether or not your conduct violates the CFAA. If you did break the law, the app will inform you why your conduct was illegal.

The app can be run locally, but it requires the Z3 command line tool, which can be found [here](https://github.com/Z3Prover/z3/releases). Next, change directories into cfaa-app, and run `npm install`. Call `npm start` from the cfaa-app folder, change directories into cfaa-app/src and call `node server.mjs` in a separate terminal window. This should launch the app at http://localhost:3000/.