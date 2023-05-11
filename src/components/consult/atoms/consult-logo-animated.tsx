import Image from "next/image";
import {motion} from "framer-motion";

export default function ConsultLogoAnimated() {
  return <motion.div
    initial={{

    }}
    animate={{
      color: "initial",
      rotate: [0, 0, 25, -25, 0],
    }}
    transition={{
      delay: 0.1,
      duration: 3,
      repeat: Infinity,
    }}
    className="mt-4"
  >
    <Image
      src={"/assets/images/2im-logo.png"}
      alt={"2IM Image"}
      height={266}
      width={266}
      layout="fixed"
      loading="eager"
    />
  </motion.div>
}