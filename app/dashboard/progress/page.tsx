import { fetchUserDimensions } from "@/lib/data";
import ProgressComponent from "@/components/custom/progress/progress-main";
import { Suspense } from "react";
import ProgressSkeleton from "@/components/custom/progress/progress-skelton";

const ProgressPage = async () => {
  const dimensionValues = await fetchUserDimensions();

  return <ProgressComponent dimensions={dimensionValues} />;
};

export default ProgressPage;
