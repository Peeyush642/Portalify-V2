"use client";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AuthService from "@/services/AuthService";
import { v4 as uuid } from "uuid";
import Lottie from "lottie-react";
import noFormAnimation from "@/assets/icons/No Form Found.json";
import embedIcon from "@/assets/icons/embedIcon.png";
import editIcon from "@/assets/icons/editIcon.png";
import deleteIcon from "@/assets/icons/bin.png";
import ShareButton from "./ShareButton";
import ViewButton from "./ViewButton";
import jsIcon from "@/assets/icons/square-js.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import scssStyles from "./embedModal.module.scss";
import styles from "./Table.module.css";
import { Box, Button } from "@mui/material";
import { Modal } from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { Select, MenuItem, FormControl } from "@mui/material";

const Home = () => {
  const [formData, setFormData] = useState([]);
  const [embedTab, setEmbedTab] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [iframeCode, setIframeCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [searchText, setSearchText] = useState("");
  const [versions, setVersions] = useState([]);

  const handleDeleteButtonClick = (formID) => {
    setDeleteID(formID);
    setOpenDeleteModal(true);
  };

  const deleteFormHandler = async (formId) => {
    console.log(formId);
    AuthService.deleteForm(deleteID).then((res) => console.log(res));
    window.location.reload(false);
  };

  useEffect(() => {
    AuthService.getUserForms()
      .then((response) => {
        const forms = response.data.forms;
        const formsWithSerialNumbers = forms.map((form, index) => ({
          ...form,
          sno: index + 1,
          id: uuid(),
          respId: uuid(),
        }));
        setFormData(formsWithSerialNumbers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = formData.filter((row) =>
    row.formName.toLowerCase().includes(searchText.toLowerCase())
  );

  const versionSelectionHandler = (formID, e) => {
    AuthService.rollbackToVersion(formID, e.target.value)
      .then((response) => {
        window.location.reload(false);
        toast.success("Form version updated successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  };
  // const isMulti = (formID) => {
  // const currentVersionData = row.versionData.find(
  //   (entry) => entry.version === form.currentVersion
  // );
  // const formData = JSON.parse(currentVersionData.data);
  // if (formData.length > 1) {
  //   return true;
  // }
  // return false;
  // };

  const columns = [
    { field: "sno", headerName: "Sno", width: 80 },
    {
      field: "formName",
      sortable: false,
      headerName: (
        <div className={styles.nameHeader}>
          <div className={styles.nameHeaderText}>Name</div>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      ),
      width: 150,
    },
    {
      field: "Timestamp",
      headerName: "Created On",
      width: 200,
      renderCell: (params) => {
        const date = new Date(params?.value);
        console.log("params row", params.row);
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
          date
        );
        return formattedDate;
      },
    },
    {
      field: "version",
      headerName: "Version",
      width: 150,
      renderCell: (params) => {
        const versions = params.row.versionData.map((entry) => entry.version);
        const currentVersion = params.row.currentVersion;
        return (
          <FormControl
            size="small"
            sx={{
              width: "4rem",
              margin: "10px 0",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select
              value={currentVersion}
              onChange={versionSelectionHandler.bind(this, params.row.formID)}
            >
              {versions.map((version) => (
                <MenuItem key={version} value={version}>
                  v{version}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "embed",
      headerName: "Embed",
      width: 150,

      renderCell: (params) => (
        <button
          className={`${styles.primaryBlueTextGreySmButton} ${
            !params.row.isPublished ? styles.disabled : ""
          }`}
          onClick={() => openEmbedModal(params.row)}
          disabled={!params.row.isPublished}
        >
          <Image src={embedIcon} width={20} alt="embed" />
        </button>
      ),
    },
    {
      field: "responseCount",
      headerName: "Responses",
      width: 120,
      renderCell: (params) => (
        <button
          className={`${styles.primaryBlueTextGreySmButton} ${
            params.row.responseCount > 0 ? styles.greenText : styles.redText
          }`}
          onClick={() => viewResponses(params.row.formID)}
        >
          {params.row.responseCount}
        </button>
      ),
    },
    {
      field: "submissions",
      headerName: "Submissions",
      width: 170,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.toggler}>
            <input
              onChange={(e) => {
                updateToast(
                  `Form - ${params.row.formName}'s submissions ${
                    params.row.submissions ? "OFF" : "ON"
                  }`
                );
                return toggleSubmissionStatus(params.row);
              }}
              id={params.row.id}
              name={params.row.id}
              type="checkbox"
              checked={params.row.submissions}
            />
            <label htmlFor={params.row.id}>
              <svg
                className={styles["toggler-on"]}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <polyline
                  className={styles.path}
                  points="100.2,40.2 51.5,88.8 29.8,67.5"
                ></polyline>
              </svg>
              <svg
                className={styles["toggler-off"]}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <line
                  className={styles.line}
                  x1="34.4"
                  y1="34.4"
                  x2="95.8"
                  y2="95.8"
                ></line>
                <line
                  className={styles.line}
                  x1="95.8"
                  y1="34.4"
                  x2="34.4"
                  y2="95.8"
                ></line>
              </svg>
            </label>
          </div>
        </div>
      ),
    },
    {
      field: "isPartialResp",
      headerName: "Partial Resp",
      width: 170,
      renderCell: (params) => {
        const currentVersionData = params.row.versionData.find(
          (entry) => entry.version === params.row.currentVersion
        );
        const formData = JSON.parse(currentVersionData.data);

        const FormDataLength = Object.keys(formData).length;
        console.log("formDataLengthhhhhhhh", FormDataLength);
        if (FormDataLength > 1) {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={styles.toggler}>
                <input
                  onChange={(e) => {
                    updateToast(
                      `Form - ${params.row.formName}'s Partial Response ${
                        params.row.isPartialResp ? "OFF" : "ON"
                      }`
                    );
                    return togglePartialRespStatus(params.row);
                  }}
                  id={params.row.respId}
                  name={params.row.respId}
                  type="checkbox"
                  checked={params.row.isPartialResp}
                />
                <label htmlFor={params.row.respId}>
                  <svg
                    className={styles["toggler-on"]}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 130.2 130.2"
                  >
                    <polyline
                      className={styles.path}
                      points="100.2,40.2 51.5,88.8 29.8,67.5"
                    ></polyline>
                  </svg>
                  <svg
                    className={styles["toggler-off"]}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 130.2 130.2"
                  >
                    <line
                      className={styles.line}
                      x1="34.4"
                      y1="34.4"
                      x2="95.8"
                      y2="95.8"
                    ></line>
                    <line
                      className={styles.line}
                      x1="95.8"
                      y1="34.4"
                      x2="34.4"
                      y2="95.8"
                    ></line>
                  </svg>
                </label>
              </div>
            </div>
          );
        }
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            -
          </div>
        );
      },
    },
    {
      field: "isPublished",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <button
          className={`${styles.primaryBlueTextGreySmButton2} ${
            params.row.isPublished ? styles.greenText : styles.redText
          } ${styles.embedButton}`}
          onClick={() => {
            updateToast(`Form - ${params.row.formName}'s status updated`);
            return togglePublishStatus(params.row);
          }}
        >
          {params.row.isPublished ? "Published" : "Draft"}
        </button>
      ),
    },
    {
      field: "formLink",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <div className={styles.bttnContainer}>
        <button
          className={styles.editButton}
          onClick={() => viewForm(params.row.formID)}
        >
          <Image src={editIcon} width={15} alt="edit" />
        </button>
        <ViewButton props={params.row} />

        <ShareButton props={params.row} />
        </div>
      ),
    },
    // {
    //   field: "view",
    //   headerName: "View",
    //   width: 150,
    //   renderCell: (params) => (
    //     <div>
    //       <ViewButton props={params.row} />
    //     </div>
    //   ),
    // },
    // {
    //   field: "share",
    //   headerName: "Share",
    //   width: 150,
    //   renderCell: (params) => <ShareButton props={params.row} />,
    // },

    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <button
          style={{ border: "none", backgroundColor: "transparent" }}
          onClick={() => handleDeleteButtonClick(params.row.formID)}
        >
          <Image src={deleteIcon} width={20} alt="delete" />
        </button>
      ),
    },
  ];

  const viewForm = (formID) => {
    const newPageURL = `/formbuilder/${formID}`;
    window.location.href = newPageURL;
  };

  const viewResponses = (formID) => {
    const newPageURL = `/responses/${formID}`;
    window.location.href = newPageURL;
  };

  const openEmbedModal = (rowData) => {
    const iframeCode = `<iframe src="${window.location.origin}/formPreview/${rowData.formID}"  width="800" height="600" frameborder="0" allowfullscreen ></iframe>`;
    const jsCode = `<script>(function(){i=document.createElement('iframe');i.src='${window.location.origin}/formPreview/${rowData.formID}';i.width='800';i.height='600';i.setAttribute('frameborder','0');i.setAttribute('allowfullscreen','');document.body.appendChild(i);})();</script>`;

    setIframeCode(iframeCode);
    setJsCode(jsCode);
    setIsEmbedModalOpen(true);
  };

  const toggleSubmissionStatus = (rowData) => {
    const updatedForm = { ...rowData, submissions: !rowData.submissions };
    const updatedFormData = formData.map((item) =>
      item.formID === rowData.formID ? updatedForm : item
    );

    setFormData(updatedFormData);

    AuthService.addNewForm(updatedForm)
      .then((response) => {
        setIsSubmitted(!isSubmitted);
      })
      .catch((error) => {
        console.error("Failed to update submissions status:", error);
      });
  };

  const togglePartialRespStatus = (rowData) => {
    const updatedForm = { ...rowData, isPartialResp: !rowData.isPartialResp };
    const updatedFormData = formData.map((item) =>
      item.formID === rowData.formID ? updatedForm : item
    );

    setFormData(updatedFormData);

    AuthService.addNewForm(updatedForm)
      .then((response) => {
        setIsPartialResp(isPartialResp);
      })
      .catch((error) => {
        console.error("Failed to update partial response status:", error);
      });
  };

  const togglePublishStatus = (rowData) => {
    const updatedForm = { ...rowData, isPublished: !rowData.isPublished };
    const updatedFormData = formData.map((item) =>
      item.formID === rowData.formID ? updatedForm : item
    );

    setFormData(updatedFormData);

    AuthService.addNewForm(updatedForm)
      .then((response) => {
        setIsPublished(ispublished);
      })
      .catch((error) => {
        console.error("Failed to update publish status:", error);
      });
  };

  const copyIframeCode = () => {
    const iframeCodeField = document.getElementById("iframeCode");
    const iframeCode = iframeCodeField.value;

    if (!navigator.clipboard) {
      // Clipboard API not supported, fallback to old method
      iframeCodeField.select();
      document.execCommand("copy");
      return;
    }

    navigator.clipboard
      .writeText(iframeCode)
      .then(() => {
        // Code copied to clipboard
        // You can show a success message or perform other actions here
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const copyJsCode = () => {
    const jsCodeField = document.getElementById("jsCode");

    if (!navigator.clipboard) {
      jsCodeField.select();
      document.execCommand("copy");
      return;
    }

    navigator.clipboard
      .writeText(jsCode)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const closeEmbedModal = () => {
    setIsEmbedModalOpen(false);
  };

  const updateToast = (text) => {
    toast.success(`${text}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const DeleteModal = () => {
    return (
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxWidth: "90%",
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography
            id="modal-modal-title"
            textAlign={"center"}
            variant="h6"
            component="h2"
          >
            Delete Form ?
          </Typography>
          <Typography
            id="modal-modal-description"
            textAlign={"center"}
            sx={{ mt: 2 }}
          >
            The delete action is permanent.
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              Close
            </Button>
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="primary"
              onClick={() => deleteFormHandler(deleteID)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box>
      {deleteID && <DeleteModal />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        {formData.length === 0 ? (
          <div className={`${styles.row} ${styles.noFormDisplay}`}>
            <Lottie
              style={{ width: "20rem", height: "20rem" }}
              animationData={noFormAnimation}
              loop={true}
            />
            <span className={styles["dashboard-heading"]}>
              YOU DON&apos;T HAVE ANY FORMS YET
            </span>
            <p>Your forms will appear here.</p>

            <a href="/formbuilder">
              <button className={styles["primary-blue-text-white-button"]}>
                CREATE FORM
              </button>
            </a>
          </div>
        ) : (
          <Box sx={{ width: "100%", margin: "0.5rem" }}>
            <Button sx={{ marginLeft: "25px" }} variant="outlined">
              Add Form +
            </Button>
            <DataGrid
              disableRowSelectionOnClick
              columns={columns}
              rows={filteredData}
              pageSize={5}
              sx={{
                height: "76vh",
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
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
            />
          </Box>
        )}
      </Box>

      {isEmbedModalOpen && (
        <div className={styles.embedModal}>
          <div className={styles["embedModal-content"]}>
            <div className={styles["embedTabs"]}>
              <span className={styles["close"]} onClick={closeEmbedModal}>
                &times;
              </span>

              <input
                className={scssStyles["embedInput"]}
                type="radio"
                id="tab1"
                name="tab"
                checked
              />
              <label
                onClick={() => setEmbedTab(1)}
                className={scssStyles["embedLabel"]}
                for="tab1"
              >
                <i className={"fa fa-code"}></i> Iframe
              </label>
              <input
                className={scssStyles["embedInput"]}
                type="radio"
                id="tab2"
                name="tab"
              />
              <label
                onClick={() => setEmbedTab(2)}
                className={scssStyles["embedLabel"]}
                for="tab2"
              >
                <img src={jsIcon} alt="" width="15px" /> JavaScript
              </label>
              <div className={scssStyles["embedLine"]}></div>
              <div className={scssStyles["embed-content-container"]}>
                {embedTab == 1 && (
                  <div className={styles["embedContent"]} id="c1">
                    <p>Copy the following iframe code to embed the form:</p>
                    <textarea id="iframeCode" value={iframeCode} readOnly />
                    <div className={styles["copyButton"]}>
                      <button
                        className={
                          styles["primary-blue-text-white-button"]
                        }
                        style={{
                          width: "110px",
                          borderRadius: "15px",
                          margin: "8px",
                          padding: "8px",
                        }}
                        onClick={copyIframeCode}
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                )}
                {embedTab == 2 && (
                  <div className={styles["embedContent"]} id="c2">
                    <p>Copy the following JavaScript code to embed the form:</p>
                    <textarea id="jsCode" value={jsCode} readOnly />
                    <div className={styles["copyButton"]}>
                      <button
                        className={
                          styles["primary-blue-text-white-button"]
                        }
                        style={{
                          width: "110px",
                          borderRadius: "15px",
                          margin: "8px",
                          padding: "8px",
                        }}
                        onClick={copyJsCode}
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Home;