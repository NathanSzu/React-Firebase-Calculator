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
              <Button text={"7"} />
              <Button text={"8"} />
              <Button text={"9"} />
              <Button text={"4"} />
              <Button text={"5"} />
              <Button text={"6"} />
              <Button text={"1"} />
              <Button text={"2"} />
              <Button text={"3"} />
              <Button className="zero" text={"0"} />
              <Button className="clear" text={"Clear"} />
            </div>

            <div className="operators col-4">
              {/* Button components for operators will go here */}
              <Button text={"+"} />
              <Button text={"-"} />
              <Button text={"*"} />
              <Button text={"/"} />
              <Button text={"="} />
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
