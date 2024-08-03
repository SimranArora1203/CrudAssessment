import React from "react";
import { useState } from "react";
import styles from "./AddUser.module.css";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();
  const add = async (e) => {
    e.preventDefault();
    fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectId: "66ab80eb7d024c0353da8a3b",
        environmentId: "66ab80eb7d024c0353da8a3c",
      },
      body: JSON.stringify({
        name,
        contact: {
          email,
          phone,
        },
        address: {
          line1,
          country,
          city,
          zip_code: zipCode,
        },
      }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("network error");
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      });
    setName("");
    setEmail("");
    setPhone("");
    setLine("");
    setCity("");
    setCountry("");
    setZipCode("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={add} className={styles.form}>
        <h1>Add Details of New Employee</h1>
        <label>Enter Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Enter your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Enter your Phone</label>
        <input
          type="text"
          placeholder="Enter your Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label>Enter Address</label>
        <input
          type="text"
          placeholder="Enter your Address"
          value={line1}
          onChange={(e) => setLine(e.target.value)}
        />
        <br />
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <label>Enter City</label>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label>Zip Code</label>
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <br />
        <div className={styles.btnContainer}>
          <button
            type="submit"
            onClick={() => alert("Employee added successfully")}
            className={styles.btn}
          >
            Submit
          </button>
          <button className={styles.btn}>
            <Link to="/" className={styles.link}>
              Back
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
