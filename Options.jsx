import React from "react";

function Options({ filter, handleChange }) {
  return (

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          height: "80px",
          paddingRight: "70px",
          backgroundColor: "#F0F0F0",
        }}
      >
        <div
          style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}
        >
          <h3
            style={{
              marginRight: "10px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Filter by:
          </h3>

          <select
            style={{
              fontSize: "1rem",
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
            id="filterBy"
            name="filterBy"
            value={filter}
            onChange={handleChange}
          >
            <option value="Price" style={{ fontWeight: "bold" }}>
              Price
            </option>
            <option value="Rating">Rating</option>
          </select>
        </div>
      </div>

  );
}

export default Options;
