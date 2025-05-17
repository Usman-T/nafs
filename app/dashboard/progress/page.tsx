import { fetchUserDimensions } from "@/lib/data";
import ProgressComponent from "@/components/custom/progress/progress-main";

const ProgressPage = async () => {
  const dimensionValues = await fetchUserDimensions();

  return <ProgressComponent dimensions={dimensionValues} />;
};

export default ProgressPage;
