"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

type Note = {
  title: string;
  content: string;
};

type Props = {
  note: Note;
};

const NotePreviewClient = ({ note }: Props) => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Modal onClose={closeModal}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default NotePreviewClient;