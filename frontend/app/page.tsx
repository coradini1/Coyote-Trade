import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>index</h1>
      <Link href="/login">login</Link>
    </main>
  );
}
