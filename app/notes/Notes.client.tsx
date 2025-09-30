"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import css from "./notes.module.css";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [delayedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["notes", currentPage, delayedSearch],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 15,
        search: delayedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userSearch = e.target.value.trim();
    setSearch(userSearch);
    setCurrentPage(1);
  };

  const notesArray = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data && notesArray.length === 0) {
      toast.error("No notes for your request :(");
    }
  }, [data, notesArray.length]);

  if (isError)
    return (
      <div className={css.error}>
        Could not fetch the list of notes.
        {error?.message || "Something went wrong"}
      </div>
    );

  return (
    <div className={css.app}>
      {isSuccess && (
        <div className={css.toolbar}>
          <SearchBox onChange={handleChange} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm onClose={handleModalClose} />
        </Modal>
      )}
      {data && notesArray.length !== 0 && <NoteList notes={notesArray} />}
      <Toaster />
    </div>
  );
}

export default NotesClient;
