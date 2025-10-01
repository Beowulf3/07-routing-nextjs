import axios from "axios";
import type { CreateNoteRequest, Note } from "../types/note";

export const BASE_URL = 'https://notehub-public.goit.study/api/notes';
export const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

export interface FetchNoteResponse {
    notes: Note[],
    totalPages: number,
}

export interface FetchNoteParams {
    search?: string,
    page?: number,
    perPage?: number,
    tag?: string,
}

export const fetchNotes = async ({page, perPage, search, tag}: FetchNoteParams): Promise<FetchNoteResponse> => {
    const response = await axios.get<FetchNoteResponse>(BASE_URL, {
        params: {
            page,
            perPage,
            search,
            tag,
            sortBy: 'created',
        }
    })   
    return response.data;
}

export const createNote = async (noteData: CreateNoteRequest ): Promise<Note> => {
    const res = await axios.post<Note>(BASE_URL, noteData);
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await axios.delete<Note>(`${BASE_URL}/${id}`);
    return res.data;
}

export const fetchNoteById = async (id:string): Promise<Note> => {
    const response = await axios.get<Note>(`${BASE_URL}/${id}`);
    return response.data;
}