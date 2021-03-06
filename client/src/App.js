import React, { useState } from 'react'
import './App.css';
import Button from './components/Button'
import HistoryItem from './components/HistoryItem'

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

  // Firesbase collection reference
  const equationHistoryRef = firestore.collection("equation-history");
  // Query to return the most recent equations
  const query = equationHistoryRef.orderBy('createdAt').limitToLast(10);
  // State to hold the returned 10 history items to be mapped
  const [history] = useCollectionData(query, { idField: 'id' });

  // Function to write equations to the firebase "history" collection
  const saveToHistory = async (answer) => {
    await equationHistoryRef.add({
      equation: `${firstNum} ${operator} ${secondNum} = ${answer}`,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  // Function to add digits to firstNum unless and operator has already been clicked
  const handleNumberClick = (e) => {
    if (operator === "" && result === "") {
      if (firstNum.includes(".") && e.target.value === ".") {

      } else {
        setFirstNum(firstNum + e.target.value)
      }
    } else if (operator === "" && result !== "") {
      setResult("")
      if (firstNum.includes(".") && e.target.value === ".") {

      } else {
        setFirstNum(firstNum + e.target.value)
      }
    } else {
      if (secondNum.includes(".") && e.target.value === ".") {
      } else {
        setSecondNum(secondNum + e.target.value)
      }
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

  const handleCalculation = () => {
    var answer;
    if (operator) {
      if (operator === "+") {
        answer = Number(firstNum) + Number(secondNum);
        setResult(answer)
      } else if (operator === "-") {
        answer = Number(firstNum) - Number(secondNum);
        setResult(answer)
      } else if (operator === "*") {
        answer = Number(firstNum) * Number(secondNum);
        setResult(answer)
      } else if (operator === "/") {
        answer = Number(firstNum) / Number(secondNum);
        setResult(answer)
      }
      console.log(`${firstNum} ${operator} ${secondNum} = ${answer.toString()}`)
      saveToHistory(answer)
      handleResult()
    }
  }

  const handleResult = () => {
    setOperator("");
    setFirstNum("");
    setSecondNum("");
  }

  return (
    <div className="body">
      <div className="fade-overlay"></div>
      <div className="wrapper">
        <header className="section col-md-7 calc-center pt-2">
          <h1 className="text-center">React Firebase Calculator</h1>
        </header>

        <main className="row">

          <section className="section col-md-7 pt-2 pb-1 calc-center">
            <div className="jumbotron">
              <div className="row">
                {/* calculations and result display will go here */}
                <div className="col-8 jumbo-display">
                  {firstNum} {operator} {secondNum} {result}
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
                <Button onClick={handleNumberClick} text={"0"} value={"0"} />
                <Button onClick={handleNumberClick} text={"."} value={"."} />
                <Button onClick={handleClear} text={"Clear"} />
              </div>

              <div className="operators col-4">
                {/* Button components for operators will go here */}
                <Button onClick={handleOperatorClick} text={"/"} value={"/"} />
                <Button onClick={handleOperatorClick} text={"*"} value={"*"} />
                <Button onClick={handleOperatorClick} text={"-"} value={"-"} />
                <Button onClick={handleOperatorClick} text={"+"} value={"+"} />
                <Button onClick={handleCalculation} text={"="} value={"="} />
              </div>
            </div>
          </section>

          <section className="section col-md-7 text-center pt-2 pb-4 calc-center">
            <h2>Equation History</h2>
            <div className="history">
              {history && history.reverse().map(equation => <HistoryItem key={equation.id} text={equation.equation} date={equation.createdAt} />)}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default App;
