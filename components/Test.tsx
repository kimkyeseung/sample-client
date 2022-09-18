import react, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Test = () => {
  const hadleTest = useCallback(() => {
    axios.get("http://localhost:3000/test").then((res) => {
      console.log("work");
      if (res.data) {
        console.log(res.data);
      }
    });
  }, []);

  return (
    <div>
      <button onClick={hadleTest}>send</button>
    </div>
  );
};

export default Test;
