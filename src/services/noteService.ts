import axios from "axios";
import type { NoteIdProps, NoteProps } from "../types/note";

interface ResponseGetData {
  notes: NoteIdProps[];
  totalPages: number;
  page: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
const notehubToken = import.meta.env.VITE_NOTEHUB_TOKEN;

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${notehubToken}`,
};

export async function fetchNotes(
  page: number,
  perPage: number,
  searchText: string
): Promise<ResponseGetData> {
  const { data } = await axios.get<ResponseGetData>("", {
    params: {
      page,
      perPage,
      ...(searchText !== "" ? { search: searchText } : {}),
    },
    headers,
  });
  return data;
}

export async function createNote(newNote: NoteProps): Promise<NoteProps> {
  const { data } = await axios.post<NoteProps>("", newNote, { headers });
  return data;
}

export async function deleteNote(noteId: number): Promise<number> {
  await axios.delete<NoteProps>(`/${noteId}`, { headers });
  return noteId;
}
