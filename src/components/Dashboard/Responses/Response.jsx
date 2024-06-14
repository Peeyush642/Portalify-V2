"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AuthService from "@/services/AuthService";
import notFoundAnimation from "@/assets/icons/notFound.json";
import Lottie from "lottie-react";
import styles from "./Response.module.css";
import Image from "next/image";

const Responses = ({ formid }) => {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [enlargedImage, setEnlargedImage] = useState(null);
  const formId = formid;
  console.log("formID",formId);
  useEffect(() => {
    console.log("formID===>>>",formId);
    AuthService.getAllResponses(formId)
      .then((response) => {
        const responseData = response.data.responses;
        console.log(response);
        const uniqueFieldIds = Array.from(
          new Set([
            "Sno",
            ...responseData
              .map((response) =>
                response.responseData.map((item) => item.field_id)
              )
              .flat(),
          ])
        );
        const fieldLabelMap = {};
        responseData.forEach((response) => {
          response.responseData.forEach((item) => {
            fieldLabelMap[item.field_id] = item.label_value;
          });
        });

        function formatDate(dateString) {
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString(undefined, options);
        }

        function cloudinaryImageFormatter(cell) {
          const value = cell.value;

          if (
            typeof value === "string" &&
            value.startsWith("https://res.cloudinary.com/")
          ) {
            return (
              <Image
                src={value}
                className={styles.tableImage}
                alt="Image"
                width={"100"}
                height={"100"}
              />
            );
          } else if (
            typeof value === "string" &&
            value.startsWith("data:application/")
          ) {
            return (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tableLink}
              >
                View Document
              </a>
            );
          } else if (
            typeof value === "string" &&
            value.match(/^\d{4}-\d{2}-\d{2}/)
          ) {
            return formatDate(value);
          } else {
            return value;
          }
        }

        const columns = uniqueFieldIds.map((fieldId) => ({
          field: fieldId, 
          headerName: fieldLabelMap[fieldId] || fieldId,
          flex: 1,
          renderCell: (params) => {
            return cloudinaryImageFormatter(params);
          },
        }));

        const rows = responseData.map((response, index) => {
          const row = { id: index + 1, Sno: index + 1 };
          response.responseData.forEach((item) => {
            row[item.field_id] = item.input_value;
          });
          return row;
        });

        setData({ columns, rows });
      })
      .catch((error) => {
        console.error("Error fetching responses:", error);
      });
  }, [formId]);

  const handleImageClick = (event) => {
    const target = event.target;
    if (
      target.tagName.toLowerCase() === "img" &&
      target.classList.contains(styles.tableImage)
    ) {
      const imageURL = target.getAttribute("src");
      setEnlargedImage(imageURL);
    }
  };
  const closeModal = () => {
    setEnlargedImage(null);
  };

  return (
    <div className={styles["leads-page"]} onClick={handleImageClick}>
      {data.rows.length > 0 ? (
        <div className={styles["grid-container"]}>
          <DataGrid
            columns={data.columns}
            rows={data.rows}
            getRowHeight={() => "auto"}
            autosizeOnMount={true}
            pageSize={5}
            disableRowSelectionOnClick
            sx={{
              height: "80vh",
              border: "0",
              borderRadius: "0",
              "& .MuiDataGrid-cell": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },

              "& .MuiDataGrid-columnHeader": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },

              "& .MuiDataGrid-columnHeaderTitleContainer": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          />
        </div>
      ) : (
        <div className={styles.noResponse}>
          <Lottie
            style={{ width: "20rem", height: "20rem" }}
            animationData={notFoundAnimation}
            loop={true}
          />
          <span className={styles["dashboard-heading"]}>NO RESPONSES YET</span>
        </div>
      )}
      {enlargedImage && (
        <div className={styles["enlarged-image-modal"]}>
          <div className={styles["enlarged-image-content"]}>
            <span
              className={styles["enlarged-image-close"]}
              onClick={closeModal}
            >
              &times;
            </span>
            <Image
              src={enlargedImage}
              alt="Enlarged IMG"
              width={400}
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Responses;
