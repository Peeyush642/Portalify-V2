import React from "react";
import styles from './ShareButton.module.css'

const ShareButton = (props) => {
  const rowData = props.props;
  const formID = rowData && rowData.formID;

  const handleShareClick = () => {
    if (formID) {
      const newPageURL = `/formPreview/${formID}`;
      window.open(newPageURL, "_blank");
    }
  };

  const isDisabled = !rowData || !rowData.isPublished;

  return (
    <button
      className={`${styles["primary-blue-icon-sm-button"]} ${
        isDisabled ? styles.disabled : ""
      }`}
      onClick={isDisabled ? null : handleShareClick}
      disabled={isDisabled}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
          <path
            d="M21.545,12a.955.955,0,0,0-.954.955v5.727a1.912,1.912,0,0,1-1.909,1.909H5.318a1.912,1.912,0,0,1-1.909-1.909V5.318A1.912,1.912,0,0,1,5.318,3.409h5.727a.955.955,0,1,0,0-1.909H5.318A3.821,3.821,0,0,0,1.5,5.318V18.682A3.821,3.821,0,0,0,5.318,22.5H18.682A3.821,3.821,0,0,0,22.5,18.682V12.955A.956.956,0,0,0,21.545,12Z"
            fill="url(#gradient)"
          />
          <path
            d="M22.25,1.823c-.012-.013-.017-.031-.03-.043s-.03-.018-.043-.03a.951.951,0,0,0-.263-.175.94.94,0,0,0-.369-.075H15.818a.955.955,0,0,0,0,1.909h3.423L12.28,10.371a.954.954,0,1,0,1.349,1.349l6.962-6.961V8.182a.955.955,0,0,0,1.909,0V2.455a.957.957,0,0,0-.074-.369A.977.977,0,0,0,22.25,1.823Z"
            fill="url(#gradient)"
          />
        </g>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#447cbf" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
};

export default ShareButton;
