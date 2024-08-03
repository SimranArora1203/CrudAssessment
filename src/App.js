import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Detail from "./Components/Detail/Detail.js";
import AddUser from "./Components/AddUser/AddUser.js";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(
      "https://free-ap-south-1.cosmocloud.io/development/api/employees?limit=100&offset=0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectId: "66ab80eb7d024c0353da8a3b",
          environmentId: "66ab80eb7d024c0353da8a3c",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data :", data);
        setData(data.data);
        console.log("data is", data.data);
      })
      .catch((error) => {
        console.error("There was a problem in fetch operation");
      });
  };
  function deleteEmp(id) {
    console.log("in delete function", id);
    fetch(
      "https://free-ap-south-1.cosmocloud.io/development/api/employees/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          projectId: "66ab80eb7d024c0353da8a3b",
          environmentId: "66ab80eb7d024c0353da8a3c",
        },
        body: JSON.stringify({}),
      }
    )
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("network response is not ok ");
        }
        return resp.json();
      })
      .then((data) => {
        console.log("deletion data ", data);
        fetchData();
      });
  }
  console.warn("data is", data);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <h1>Employees Details</h1>
                <table border="10">
                  <thead>
                    <tr>
                      <th>Employee Id</th>
                      <th>Employee Name</th>
                      <th>Detail Page</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.name || "no name"}</td>
                          <td>
                            <button className="btn">
                              <Link to={`/Detail/${item._id}`} className="link">
                                Detail Page
                              </Link>
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => deleteEmp(item._id)}
                              className="btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr colspan="2">No data available</tr>
                    )}
                  </tbody>
                </table>{" "}
                <button className="addBtn">
                  <Link to={"/AddUser"} className="link">
                    Add New Employee
                  </Link>
                </button>
              </div>
            }
          />
          <Route path="/Detail/:id" element={<Detail />}></Route>
          <Route path="/AddUser" element={<AddUser />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
