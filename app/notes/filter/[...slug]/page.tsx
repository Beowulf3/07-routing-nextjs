import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const initialPage = 1;
  const initialSearch = "";
  const tag = slug[0] === "All" ? undefined : slug[0];

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
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
