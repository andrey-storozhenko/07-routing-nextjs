
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};


const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;
    const category = slug[0] === "all" ? undefined : slug[0];

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, category],
        queryFn: () => fetchNotes("", 1, category),
    });

    

    return (
         <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <h1>Notes List</h1>
                <NotesClient category={category} />
            </div>
        </HydrationBoundary>
    );
};

export default NotesByCategory;