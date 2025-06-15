import axios from "axios";
import type { Note } from "../types/note";

interface ResponseGetData {
  notes: Note[];
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

export async function createNote(newNote: Note): Promise<Note> {
  const { data } = await axios.post<Note>("", newNote, { headers });
  return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await axios.delete<Note>(`/${noteId}`, { headers });
  return data;
}
