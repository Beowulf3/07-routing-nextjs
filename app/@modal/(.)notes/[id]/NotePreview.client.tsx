"use client";

import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (error || !note) {
    return <p>Something went wrong. ${error?.message}</p>;
  }

  return (
    note && (
      <Modal onClose={() => router.back()}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
            <button className={css.backBtn} onClick={() => router.back()}>
              Back
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default NotePreviewClient;
