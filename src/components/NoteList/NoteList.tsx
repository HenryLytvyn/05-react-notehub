import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteIdProps } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteServices";

interface NoteListProps {
  notes: NoteIdProps[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allNotes"],
      });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const { title, content, tag, id } = note;
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>${title}</h2>
            <p className={css.content}>${content}</p>
            <div className={css.footer}>
              <span className={css.tag}>${tag}</span>
              <button
                onClick={() => {
                  removeItem(id);
                }}
                disabled={isPending}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
