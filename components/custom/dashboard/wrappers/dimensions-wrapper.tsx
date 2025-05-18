import React from "react";
import Dimensions from "@/components/custom/dashboard/dimensions";
import { fetchUserDimensions } from "@/lib/data";

const DimensionsWrapper = async () => {
  const dimensionValues = await fetchUserDimensions();
  return <Dimensions dimensions={dimensionValues} />;
};

export default DimensionsWrapper;
