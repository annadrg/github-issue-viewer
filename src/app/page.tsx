import SearchInput from "@/components/search-input";
import SearchResults from "@/components/search-results";

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">
        GitHub Repository Issues Viewer
      </h1>
      <SearchInput />
      <SearchResults />
    </main>
  );
}
