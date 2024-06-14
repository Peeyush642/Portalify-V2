import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import classes from "./templates.module.css";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import AuthService from "@/services/AuthService";
import Image from "next/image";
import { toast } from "react-toastify";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  const togglePublish = (formID, TempIsPublished) => {
    console.log("TempIsPublished", TempIsPublished);
    setIsPublished(!TempIsPublished);
    console.log("TempIsPublishedAfterToggle", !TempIsPublished);
    handlePublish(formID, !TempIsPublished);
  };

  useEffect(() => {
    AuthService.getTemplates().then((res) => {
      console.log(res);
      setTemplates(res.data.templates);
    });
  }, []);

  const handlePublish = async (formID, isPublished) => {
    try {
      const response = await AuthService.publishStatusUpdate(
        formID,
        isPublished
      );
      if (response) {
        toast.success("Template published successfully");
        // Update templates state to reflect the change without reloading the page
        setTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template.id === formID
              ? { ...template, isPublished: isPublished }
              : template
          )
        );
      } else {
        toast.error("Failed to publish template");
      }
    } catch (error) {
      console.error("Error while publishing template:", error);
      toast.error("Error while publishing template. Please try again.");
    }
  };

  const handleDelete = async (formID) => {
    try {
      const response = await AuthService.deleteTemplate(formID);
      if (response) {
        toast.success("Template deleted successfully");
        // Update templates state to reflect the change without reloading the page
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template.id !== formID)
        );
      } else {
        alert("Failed to delete template");
      }
    } catch (error) {
      console.error("Error while deleting template:", error);
      alert("Error while deleting template. Please try again.");
    }
  };

  const viewForm = (formID) => {
    if (typeof window !== "undefined") {
      const newPageURL = `/formbuilder/template/${formID}`;
      window.location.href = newPageURL;
    }
  };

  const handlePreview = (formID) => {
    if (typeof window !== "undefined") {
      const newPageURL = `/formPreview/template/${formID}`;
      window.location.href = newPageURL;
    }
  };

  return (
    <div className={classes.templates}>
      <div className={classes.createBtn}>
        <Link href="/formbuilder/template">
          <button className={classes.button}>
            <div className={classes.buttonSvgContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </div>

            <div classNAme={classes.text}>Create</div>
          </button>
        </Link>
      </div>
      <div className={classes.templatesWrapper}>
        {templates.map((template) => (
          <div key={template._id} className={classes.cardContainer}>
            <div className={classes.card}>
              {/* <div
                className={classes.templateImg}
                onClick={() => handlePreview(template.formID)}
                // style={{
                //   backgroundImage: `url(${template.templateImg})`,
                // }}
              > */}
                <img  className={classes.templateImg}
              onClick={() => handlePreview(template.formID)} src={template.templateImg} alt="" ></img>
              {/* </div> */}
              <div className={classes.templateContent}>
                <p className={classes.tempName}>{template.formName}</p>
                <div className={classes.templateTags}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ minWidth:"auto",padding:"0.25rem 0.5rem", fontSize: "0.75rem" }}
                    onClick={() => viewForm(template.formID)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ minWidth:"auto",padding:"0.25rem 0.5rem", fontSize: "0.75rem" }}
                    onClick={() => togglePublish(template.formID, template.isPublished)}
                  >
                    {template.isPublished ? "Unpublish" : "Publish"}
                  </Button>

                   
                  <MdDeleteOutline
                    onClick={() => handleDelete(template.formID)}
                    style={{ cursor: "pointer"}} 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
