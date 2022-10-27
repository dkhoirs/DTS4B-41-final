import { Chip } from "@mui/material";
import "../Assets/css/CategoriesChip.css";
const CategoriesChip = ({ data }) => {
  const classChip = "CategoriesChip " + data;
  return <Chip label={data} size="small" className={classChip} />;
};
export default CategoriesChip;
