"use client";

import { useState } from "react";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import css from "../../components/NotesPage/NotesPage.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {fetchNotes} from "../../../../lib/api";
import { useDebouncedCallback } from 'use-debounce';
import NoteList from "../../../../components/NoteList/NoteList";
import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Pagination from "../../../../components/Pagination/Pagination";

type Props = {
  category?: string;
};

export default function NotesClient({ category }: Props) {

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ["notes", searchQuery, page,category],
        queryFn: () => fetchNotes(searchQuery, page,category),
        placeholderData: keepPreviousData,
    })

    const updateSearchQuery = useDebouncedCallback(
        (value : string) => { 
            setSearchQuery(value);
            setPage(1);
        },300
    );
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox query={searchQuery} updateSearchQuery={updateSearchQuery}></SearchBox>
                {(data?.totalPages ?? 0) > 1 && <Pagination
                    pageCount={data?.totalPages ?? 0}
                    currentPage={page - 1}
                    onPageChange={(newPage) => setPage(newPage + 1)}
                />}
               

               <button className={css.button} onClick={openModal}>Create note +</button>
            </header>
            {isFetching && <div>Loading notes...</div>}
            {(data?.notes?.length ?? 0) > 0 && <NoteList notes={data?.notes ?? []}></NoteList>}
            {isModalOpen && <Modal onClose={closeModal}><NoteForm onClose={closeModal}></NoteForm></Modal>}
        </div>
    );
}