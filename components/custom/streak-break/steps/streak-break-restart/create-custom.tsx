import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const CreateCustomBranch = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 px-8 py-12 text-center"
    >
      <div className="space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-[#ebdbb2]"
        >
          Cusomt Challenge Creator
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-[#a89984] max-w-2xl mx-auto"
        >
          gogo gaga
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card className="bg-[#3c3836] border-[#665c54]">
          <CardHeader>
            <CardTitle className="text-[#ebdbb2]">
              Custom Challenge Creator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#a89984] text-lg">
              This will be replaced with the actual form/preview content
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CreateCustomBranch;
