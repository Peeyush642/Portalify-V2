
import { useState } from "react";

const useCustomCss = (state, setState, selectedElement) => {
  const [customCSS, setCustomCSS] = useState("");

  const addCustomCssHandler = () => {
    console.log(customCSS);
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;
    let newHtmlContent;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;
        const parser = new DOMParser();
        newHtmlContent = parser.parseFromString(oldHtmlContent, "text/html");
      }
    }

    const propArray = customCSS.split("\n");

    console.log(propArray);
    // const newState = { ...prevState };
    // const newHtmlContent = { ...dataArray };

    const myInput = newHtmlContent.querySelector(".htmlContent");
    for (let i = 0; i < propArray.length; i++) {
      const [property, value] = propArray[i].split(":");
      const trimmedProperty = property.trim();
      const trimmedValue = value.trim();

      console.log(trimmedProperty, trimmedValue);

      const camelCaseProperty = trimmedProperty.replace(
        /-([a-z])/g,
        (_, letter) => letter.toUpperCase()
      );

      console.log(camelCaseProperty);

      const name = camelCaseProperty;
      myInput.style[name] = trimmedValue;
    }
    // newState[key] = { ...prevState[key], htmlContent: newHtmlContent };
    setState((prevState) => {
      const updatedChildren = [...(prevState[key]?.children || [])];
      if (index !== -1 && newHtmlContent) {
        updatedChildren[index] = {
          ...(updatedChildren[index] || {}),
          htmlContent: newHtmlContent.documentElement.innerHTML,
        };
      }
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          children: updatedChildren,
        },
      };
    });
  };

  return { customCSS, setCustomCSS, addCustomCssHandler };
};

export default useCustomCss;
