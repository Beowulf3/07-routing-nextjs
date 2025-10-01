import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ filters: string }>;
}

const Notes = async ({ params }: Props) => {
  const { filters } = await params;
  const initialPage = 1;
  const initialSearch = "";
  const tag = filters[0] === "All" ? undefined : filters[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", initialPage, initialSearch, tag],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: 15,
        search: initialSearch,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
