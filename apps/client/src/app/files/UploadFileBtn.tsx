'use client';

import UploadFiles from '@client/components/File/UploadFiles';
import { FileModel } from '@prisma/client';

export default function UploadFileBtn() {
  return (
    <UploadFiles multiple={true} showPreview={false}>
      {({ setShow }) => (
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="btn-primary py-2 px-4"
        >
          Upload File
        </button>
      )}
    </UploadFiles>
  );
}
