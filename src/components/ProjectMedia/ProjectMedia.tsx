import React from "react";

// import FileUploaderWithPreview from "../FileUploaderWithPreview/FileUploaderWithPreview";
import FileUploaderWithPreview from "../FileUploaderWithPreview/FileUploaderWithPreview";

import "./ProjectMedia.style.scss";

const ProjectMedia = () => {
  return (
    <>
      <div className="project-media__header">Project Media</div>
      <div className="project-media__box">
        <h6 className="project-media__title">{"title"}</h6>
        <div className="project-media__sizes-list">
          <span className="project-media__size">{"1600x950px"}</span>
        </div>
        <FileUploaderWithPreview />
      </div>
    </>
  );
};

export default ProjectMedia;
