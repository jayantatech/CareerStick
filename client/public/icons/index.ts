import { MdAdd } from "react-icons/md";
import AIBot from "./chatbot.svg";

const iconMapping = {
  add: MdAdd,
};

export type IconName = keyof typeof iconMapping;

export default iconMapping;

export { AIBot };
