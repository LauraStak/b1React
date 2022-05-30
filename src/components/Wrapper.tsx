import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Wrapper = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        await axios.get("user");
      } catch (e) {
        setRedirect(true);
      }
    };

    getData();
  }, []);
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return <div></div>;
};

export default Wrapper;
