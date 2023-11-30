import React from 'react';
import { BiSend } from 'react-icons/bi';
type PropsType = {
  inputRef: React.LegacyRef<HTMLInputElement> | null;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};
export default function MessageForm({ inputRef, onSubmit }: PropsType) {
  return (
    <form onSubmit={onSubmit} className="z-0 relative flex w-auto">
      <input
        ref={inputRef}
        className="input bg-secondary-200 px-6 py-4 block border-0 outline-0 rounded-r-full rounded-l-full"
        placeholder="message..."
      />
      <button className="absolute right-2 inset-y-0 text-slate-500 pt-0">
        <BiSend size={34} />
      </button>
    </form>
  );
}
