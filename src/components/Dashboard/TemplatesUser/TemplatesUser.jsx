import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import classes from "./TemplatesUser.module.css";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import AuthService from "@/services/AuthService";
import { set } from "ace-builds/src-noconflict/ace";
import { is } from "@react-spring/shared";
import { toast } from "react-toastify";
import { to } from "react-spring";

const TemplatesUser = ({ onTempClick }) => {
  const [templates, setTemplates] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    AuthService.getTemplates().then((res) => {
      console.log(res);
      setTemplates(res.data.templates);
    });
  }, []);


  const handleTempClick = (formID) => {
    console.log("djsfjns",formID);
    onTempClick(formID);
  };

  return (
    <div className={classes.templates}>
      <div className={classes.templatesWrapper}>
        {templates.map((template) => (
          <section key={template._id} className={classes["section-4"]}>
            <div className={classes.row}>
              <figure className={classes.figure}>
                <img src={template.templateImg} alt="TemplateImg" />
                <div>
                  <h3 className={classes.tempBtn} 
                  onClick={()=>handleTempClick(template.formID)}
                  >
                    Use Template
                  </h3>
                </div>
              </figure>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TemplatesUser;
