import SearchInput from "@/components/search-input";

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">
        GitHub Repository Issues Viewer
      </h1>
      <SearchInput />
    </main>
  );
}
