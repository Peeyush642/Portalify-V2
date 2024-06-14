import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/FormBuilderContext";
import { Box } from "@mui/material";
import SingleLine from "./SingleLine/SingleLine";
import Divider from "./Divider/Divider";
import DropDown from "./DropDown/DropDown";
import Radio from "./Radio/Radio";
import CheckBox from "./CheckBox/CheckBox";
import Heading from "./Heading/Heading";
import Paragraph from "./Paragraph/Paragraph";
import Button from "./Button_s/Button_s";
import TextArea from "./TextArea/TextArea";
import Number from "./Number/Number";
import Date from "./Date/Date";
import DateTime from "./DateTime/DateTime";
import Image from "./Image/Image";
import Rating from "./Rating/Rating";
import LinkElement from "./LinkElement/LinkElement";
// import Name from "./Name/Name";



const ElementStyling = () => {
  const { elementType, selectedElement } = useContext(UserContext);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => (prevKey + 1) % 1000);
  }, [elementType, selectedElement]);

  return (
    <Box
      key={key}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        flexWrap: "wrap",
        textAlign: "left",
        color: "black",
      }}
    >
      {elementType === 1 && <Button />}
      {elementType === 2 && <SingleLine />}
      {elementType === 3 && <TextArea />}
      {elementType === 4 && <Number />}
      {elementType === 5 && <Date />}
      {elementType === 6 && <DateTime />}
      {elementType === 13 && <Divider />}
      {elementType === 7 && <DropDown />}
      {elementType === 8 && <Radio />}
      {elementType === 9 && <CheckBox />}
      {elementType === 14 && <LinkElement />}
      {elementType === 15 && <Rating />}
      {elementType === 17 && <Button />}
      {elementType === 18 && <Image />}
      {elementType === 19 && <Heading />}
      {elementType === 20 && <Paragraph />}
      {elementType === 21 && <Button />}
      {elementType === 22 && <Button />}
      {/* {elementType === 23 && <Button />} */}
      
      {/* {elementType === 16 && <Name />} */}
      

    </Box>
  );
};

export default ElementStyling;
