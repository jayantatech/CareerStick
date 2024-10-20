import { MdAdd } from "react-icons/md";

const iconMapping = {
  add: MdAdd,
};

export type IconName = keyof typeof iconMapping;

export default iconMapping;
