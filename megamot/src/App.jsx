// src/App.jsx
import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult(null);
    try {
      const docRef = doc(db, "students", code);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResult(docSnap.data());
      } else {
        setError("תעודת הזהות לא קיימת במערכת");
      }
    } catch (e) {
      console.error(e);
      setError("משהו לא עובד");
    }
  };



  function isComputer(result) {
  const values = [result["אשכול א"], result["אשכול ב"]];

  const keywords = [
    "ביולוגיה",
    "מדעי הסביבה",
    "מדעי המחשב",
    "הנדסת תוכנה",
    "מידע ונתונים"
  ];

  return values.some(value =>
    keywords.some(keyword => value.includes(keyword))
  );
}

function getMatchingSubjects(result) {
  const values = [result["אשכול א"], result["אשכול ב"]];

  const keywords = [
    "ביולוגיה",
    "מדעי הסביבה",
    "מדעי המחשב",
    "הנדסת תוכנה",
    "מידע ונתונים"
  ];

  return values.filter(value =>
    keywords.some(keyword => value.includes(keyword))
  );
}

  return (
    <div style={{ padding: "2rem", maxWidth: 500, margin: "auto" }}>
      {error && <h3 style={{
  textAlign: "end",
  color: "red",
  backgroundColor: "#444",
  borderRadius: "10px",
  padding: "10px"}}>{error}</h3>}
      {result ? (
        <div className="resultDiv">
          <h2>שלום {result["שם פרטי"] + " " + result["שם משפחה"]}</h2>
          <div className="resultDetails">
            <label>[ אשכול א ]</label>
            <p>{result["אשכול א"]}</p>
            <hr className="hrLine"/>
            <label>[ אשכול ב ]</label>
            <p>{result["אשכול ב"]}</p>

            <hr className="hrLine"/>
            <label>[ יחל מתמטיקה ]</label>
            <p>{result["יחל מתמטיקה"]}</p>

            {isComputer(result) && <>
                <hr class="hrLine" />
                <div className="noteLine">
                <div className="listMegamot">
                    <p className="noteText">
                      שימו לב עליכם להצטייד במחשב נייד אישי לצורך לימודי המגמות:
                    </p>
                    <ul className="subjectList">
                      {getMatchingSubjects(result).map((subject, index) => (
                        <li key={index} className="subjectItem">{subject}</li>
                      ))}
                    </ul>
                  </div>
              </div>
            </>}
            <hr className="hrLine"/>
            <button onClick={() => {setResult(null)}} className="buttonBack" style={{ marginTop: "1rem" }}>אחורה</button>
          </div>
        </div>
      ) : <div className="enterIdDiv">
            <h1 className="enterId">הכנס תעודת זהות</h1>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="תעודת זהות"
            /> 
            <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
              שלח
            </button>
          </div>}
    </div>
  );
}

export default App;
