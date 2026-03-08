
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};


const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;

    const category = slug[0] === "all" ? undefined : slug[0];

    return (
        <div>
            <h1>Notes List</h1>
            <NotesClient category={category} />;
        </div>
    );
};

export default NotesByCategory;