import React, { useState } from 'react'
import './App.css';
import Button from './components/Button'

// Importing firebase SDK
import firebase from 'firebase/app';
// Importing firestore database
import 'firebase/firestore';
// Importing firebase hooks to use in react
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAOdZQXcxWBZHU4azPDF4l95xByQlvWjUc",
  authDomain: "calculator-861f4.firebaseapp.com",
  databaseURL: "https://calculator-861f4.firebaseio.com",
  projectId: "calculator-861f4",
  storageBucket: "calculator-861f4.appspot.com",
  messagingSenderId: "864317141433",
  appId: "1:864317141433:web:4f3a00e6d2330e06588668"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Referencing firestore as a global variable
const firestore = firebase.firestore();

function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  // Function to add digits to firstNum unless and operator has already been clicked
  const handleNumberClick = (e) => {
    if (operator === "" && result === "") {
      setFirstNum(firstNum + e.target.value)
    } else if (operator === "" && result !== "") {
      setResult("")
      setFirstNum(firstNum + e.target.value)
    } else {
      setSecondNum(secondNum + e.target.value)
    }
  }

  const handleClear = () => {
    setOperator("");
    setFirstNum("");
    setSecondNum("");
    setResult("");
  }

  const handleOperatorClick = (e) => {
    if (firstNum !== "") {
      setOperator(e.target.value)
    } else if (firstNum === "" && result !== "") {
      setFirstNum(result)
      setResult("")
      setOperator(e.target.value)
    }
  }

  return (
    <div>
      <header>
        <h1 className="text-center">React Firebase Calculator</h1>
      </header>

      <main className="row">
        <section className="col-md-6 calc-center">

          <div className="jumbotron">
            <div className="row">
              {/* calculations and result display will go here */}
              <div className="col-8">
                {firstNum} {operator} {secondNum} {result}
              </div>
              <div className="col-4">

              </div>
            </div>
          </div>

          <div className="row">

            <div className="numbers col-8">
              {/* Button components for numbers will go here */}
              <Button onClick={handleNumberClick} text={"7"} value={"7"} />
              <Button onClick={handleNumberClick} text={"8"} value={"8"} />
              <Button onClick={handleNumberClick} text={"9"} value={"9"} />
              <Button onClick={handleNumberClick} text={"4"} value={"4"} />
              <Button onClick={handleNumberClick} text={"5"} value={"5"} />
              <Button onClick={handleNumberClick} text={"6"} value={"6"} />
              <Button onClick={handleNumberClick} text={"1"} value={"1"} />
              <Button onClick={handleNumberClick} text={"2"} value={"2"} />
              <Button onClick={handleNumberClick} text={"3"} value={"3"} />
              <Button onClick={handleNumberClick} className="zero" text={"0"} />
              <Button onClick={handleClear} className="clear" text={"Clear"} />
            </div>

            <div className="operators col-4">
              {/* Button components for operators will go here */}
              <Button onClick={handleOperatorClick} text={"+"} value={"+"} />
              <Button onClick={handleOperatorClick} text={"-"} value={"-"} />
              <Button onClick={handleOperatorClick} text={"*"} value={"*"} />
              <Button onClick={handleOperatorClick} text={"/"} value={"/"} />
              <Button text={"="} value={"="} />
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
