'use client';
import handleUploadFile from '@client/libs/client/files/handleUploadFile';
import { FileModel } from '@prisma/client';
import React, { ReactNode, useRef, useState } from 'react';
import Model from '../ui/Model';

type PropsType = {
  children: ({
    setShow,
  }: {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
  title: string;
  type?: '*' | 'image/*';
  onUpload: (files: FileModel[]) => void;
};


export default function UploadFiles({
  children,
  onUpload,
  title,
  type = '*',
}: PropsType) {
  const [show, setShow] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  async function onSubmit() {
    if (!fileInputRef.current || !fileInputRef.current.files) {
      return;
    }
    const formData = new FormData();
    const myFiles = fileInputRef.current.files;
    Object.keys(myFiles).forEach((key) => {
      const file = myFiles.item(key as unknown as number);
      if (file) {
        formData.append(file.name, file);
      }
    });

    const response = await handleUploadFile(myFiles);
    if (response.files) {
      onUpload(response.files);
    }
  }
  return (
    <>
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
      >
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>{title}</label>
            <input
              className="input"
              type="file"
              ref={fileInputRef}
              accept={type}
              multiple
              placeholder="file"
            />
          </div>
          <div className="col-span-2 flex justify-end  gap-1 w-full">
            <button
              type="button"
              onClick={onSubmit}
              className="btn-primary py-2 px-4"
            >
              Submit
            </button>
          </div>
        </div>
      </Model>
      {children({ setShow })}
    </>
  );
}
