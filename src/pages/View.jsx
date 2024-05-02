import React from "react";
import { useParams } from "react-router";

const View = () => {
  const { publicString } = useParams();
  return <div>{publicString}</div>;
};

export default View;
