import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";
const Detail = () => {
  const params = useParams();
  const { id } = params;
  console.warn("id is", id);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://free-ap-south-1.cosmocloud.io/development/api/employees/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectId: "66ab80eb7d024c0353da8a3b", // Replace with your actual project id
          environmentId: "66ab80eb7d024c0353da8a3c", // Replace with your actual environment id
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("network response not ok");
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log("data4 is ", data);
      })
      .catch((error) => {
        console.log("there was a problem in fetch operation");
      });
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.detailHeading}>Employee Details</h1>
      <div>
        {data ? (
          <div className={styles.maincontainer}>
            <p className={styles.detail}>
              <strong>ID:</strong>
              {data._id || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>Name:</strong>
              {data.name || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>Email:</strong>
              {data.contact?.email || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>Phone:</strong>
              {data.contact?.phone || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>Address:</strong>
              {data.address?.line1 || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>City:</strong>
              {data.address?.city || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>Country:</strong>
              {data.address?.country || "not available"}
            </p>
            <p className={styles.detail}>
              <strong>Zip Code:</strong>
              {data.address?.zip_code || "not available"}
            </p>
          </div>
        ) : (
          <p className={styles.detail}>User Information is not present</p>
        )}
        <button className={styles.btn}>
          <Link to="/" className={styles.link}>
            Back
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Detail;
