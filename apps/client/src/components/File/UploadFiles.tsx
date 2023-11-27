'use client';
import Model from '@client/components/ui/Model';
import getFileUrl from '@client/helpers/getFileUrl';
import handleUploadFile from '@client/libs/client/files/handleUploadFile';
import { FileModel } from '@prisma/client';
import Image from 'next/image';
import React, { ReactNode, Suspense, useRef, useState } from 'react';

type PropsType = {
  children: ({
    setShow,
  }: {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
  type?: '*' | 'image/*';
  onUpload: (files: FileModel[]) => void;
  files: FileModel[];
  multiple?: boolean;
  defaultValues: FileModel[];
};

export default function UploadFiles({
  files,
  children,
  onUpload,
  defaultValues,
  type = '*',
  multiple = false,
}: PropsType) {
  enum ActiveSelector {
    LOCAL,
    MEDIA,
  }
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<FileModel[]>(defaultValues);
  const [previews, setPreviews] = useState<FileModel[]>(selected);
  const [active, setActive] = useState<ActiveSelector>(ActiveSelector.MEDIA);
  const fileInputRef = useRef<HTMLInputElement>(null);
  async function onSubmit() {
    if (!fileInputRef.current || !fileInputRef.current?.files?.length) {
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
      onUpload(response.files ?? []);
      setPreviews(response.files);
      setShow(false);
    }
  }

  function exist(files: FileModel[], file: FileModel): boolean {
    return !!files.find((fl) => fl.id === file.id);
  }
  function onSelect(file: FileModel) {
    setSelected((prevFiles) => {
      if (multiple) {
        if (exist(prevFiles, file)) {
          return prevFiles.filter((prevFile) => prevFile.id !== file.id);
        }
        return [...prevFiles, file];
      } else {
        return [file];
      }
    });
  }
  return (
    <>
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
      >
        <div className="w-fill flex flex-col mt-2">
          <nav className="flex items-center justify-start bg-secondary-200 dark:bg-secondary-800 ">
            <button
              onClick={() => setActive(ActiveSelector.MEDIA)}
              className="px-4 py-2 hover:bg-slate-300 hover:dark:bg-slate-700"
            >
              Media
            </button>
            <button
              onClick={() => setActive(ActiveSelector.LOCAL)}
              className="px-4 py-2 hover:bg-slate-300 hover:dark:bg-slate-700"
            >
              Local
            </button>
          </nav>
          <div className="bg-slate-200 dark:bg-slate-950 px-2 max-h-screen overflow-y-hidden">
            {active === ActiveSelector.MEDIA && (
              <Suspense fallback={<div>Loading..</div>}>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-2 ">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className={`flex rounded ${
                        exist(selected, file) ? 'outline outline-1' : ''
                      }`}
                      onClick={() => onSelect(file)}
                    >
                      <Image
                        src={getFileUrl(file)}
                        alt={file.name}
                        width={400}
                        height={400}
                        className="w-full object-cover aspect-square rounded"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end my-2 border-t py-2">
                  <button
                    type="button"
                    onClick={() => {
                      onUpload(selected);
                      setPreviews(selected);
                      setShow(false);
                    }}
                    className="btn-primary py-2 px-4"
                  >
                    finished
                  </button>
                </div>
              </Suspense>
            )}
            {active === ActiveSelector.LOCAL && (
              <div className="w-full flex p-2">
                <input
                  className="input border-none outline-0"
                  type="file"
                  ref={fileInputRef}
                  accept={type}
                  multiple={multiple}
                  placeholder="file"
                />
                <button
                  type="button"
                  onClick={onSubmit}
                  className="btn-primary py-2 px-4"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </Model>
      {children({ setShow })}
      {!!previews.length && (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-2 ">
          {previews.map((file) => (
            <div
              key={file.id}
              className={`flex rounded `}
              onClick={() => onSelect(file)}
            >
              <Image
                src={getFileUrl(file)}
                alt={file.name}
                width={400}
                height={400}
                className="w-full object-cover aspect-square rounded"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
