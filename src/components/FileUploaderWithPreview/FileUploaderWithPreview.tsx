import { useState } from "react";

import FileUploader from "devextreme-react/file-uploader";
import ProgressBar from "devextreme-react/progress-bar";
import Icon from "../Icon/Icon";

import "./FileUploaderWithPreview.style.scss";

const FileUploaderWithPreview = () => {
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [imageSource, setImageSource] = useState<string[]>([]);
  const [textIsVisible, setTextIsVisible] = useState(true);
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const allowedFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];

  const onDropZoneEnter = (e: any) => {
    if (e.dropZoneElement.id === "dropzone-external") {
      setIsDropZoneActive(true);
    }
  };

  const onDropZoneLeave = (e: any) => {
    if (e.dropZoneElement.id === "dropzone-external") {
      setIsDropZoneActive(false);
    }
  };

  const onUploaded = (e: any) => {
    const file = e.file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setIsDropZoneActive(false);
      setImageSource((prevState: string[]) => {
        return [...prevState, fileReader.result as string];
      });
    };
    fileReader.readAsDataURL(file);
    setTextIsVisible(false);
    setIsProgressVisible(false);
    setProgressValue(0);
  };

  const onProgress = (e: any) => {
    const progressValue = (e.bytesLoaded / e.bytesTotal) * 100;
    setProgressValue(progressValue);
  };

  const onUploadStarted = () => {
    console.log("onUploadStarted"); // Only executes when drag&drop used or first time uploaded a file with the file picker
    setIsProgressVisible(true);
  };

  return (
    <div className="file-uploader">
      <div
        id="dropzone-external"
        className={`flex-box ${
          isDropZoneActive
            ? "dx-theme-accent-as-border-color dropzone-active"
            : "dx-theme-border-color"
        }`}
        onClick={() => {
          console.log("onClick dropzone-external");
        }}
      >
        {imageSource && (
          <img id="dropzone-image" src={imageSource[0] as string} alt="" />
        )}

        {textIsVisible && (
          <div id="dropzone-text" className="flex-box">
            <Icon />
          </div>
        )}
        <ProgressBar
          id="upload-progress"
          min={0}
          max={100}
          width="30%"
          showStatus={false}
          visible={isProgressVisible}
          value={progressValue}
        />
      </div>
      <div className="file-uploader__mini-preview-list">
        {(imageSource as string[]).map(
          (img, i) =>
            i > 0 && (
              <img
                key={i}
                src={img as string}
                alt=""
                className="file-uploader__mini-preview"
              />
            )
        )}
      </div>
      <FileUploader
        id="file-uploader"
        dialogTrigger="#dropzone-external"
        dropZone="#dropzone-external"
        multiple={true}
        allowedFileExtensions={allowedFileExtensions}
        // uploadMode="instantly"
        // uploadUrl="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
        visible={false}
        onDropZoneEnter={onDropZoneEnter}
        onDropZoneLeave={onDropZoneLeave}
        onUploadStarted={onUploadStarted}
        onUploaded={onUploaded}
        onProgress={onProgress}
      />
    </div>
  );
};

export default FileUploaderWithPreview;
