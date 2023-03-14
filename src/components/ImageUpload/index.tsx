/**
 * ImageUpload component.
 */
import React from 'react';
import { Button } from 'reactstrap';

interface IImageUploadProps {
  imgError: string,
  allowedTypes: string[],
  maxSize: number,
  imgUrl?: string,
  imgFile?: File,
  setImgFile: (imgFile: File) => void,
  disabled: boolean,
}

function ImageUpload({
  imgError,
  allowedTypes,
  maxSize,
  imgUrl,
  imgFile,
  setImgFile,
  disabled,
} : IImageUploadProps) {
  let src = imgUrl;
  if (imgFile) {
    src = window.URL.createObjectURL(imgFile);
  }

  const onChangeImage = (e:any) => {
    e.preventDefault();

    const fileInput = document.querySelector('#change-image-input');
    if (fileInput == null) return;
    (fileInput as HTMLButtonElement).click();
  };

  const onUploadImage = (e:any) => {
    e.preventDefault();

    const fileInput = document.querySelector('#change-image-input');
    const fileInputElement = fileInput as HTMLInputElement;
    if (fileInputElement == null) return;
    if (fileInputElement.files == null) return;
    const file = fileInputElement.files[0];

    if (file === undefined) {
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      return;
    }
    if (file.size > maxSize) {
      return;
    }
    setImgFile(file);
  };

  return (
    <React.Fragment>
      <img src={src} alt='user icon'
        onError={(e) => {
          if (e.target) {
            (e.target as HTMLImageElement).src = imgError;
          }
          e.preventDefault();
        }}
      />
      <Button
        onClick={onChangeImage}
        disabled={disabled}
      >
        upload
      </Button>
      <input type="file" name="image" accept="image/*"
        onChange={onUploadImage} id="change-image-input" className="input-image"
        disabled={disabled}
      />
    </React.Fragment>
  );
}

export default ImageUpload;
