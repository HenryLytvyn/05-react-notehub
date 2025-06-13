import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import NoteModal from "../NoteModal/NoteModal";
import Pagination from "../Pagination/Pagination";
import { useDebounce } from "use-debounce";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debauncedQuery] = useDebounce(search, 1000);
  const perPage = 12;

  const allNotes = useQuery({
    queryKey: ["allNotes", debauncedQuery, page],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData,
  });

  function handleSearch(search: string) {
    setSearch(search);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />

        {allNotes.isSuccess && allNotes.data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={allNotes.data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create note +
        </button>
      </header>
      {allNotes.isSuccess && allNotes.data.notes.length > 0 && (
        <NoteList notes={allNotes.data.notes} />
      )}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
