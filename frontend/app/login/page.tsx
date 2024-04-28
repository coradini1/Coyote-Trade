import Input from "@/components/custom/Input/Input";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-96 p-8 rounded-sm shadow-xl">
        <h1 className="font-bold text-xl text-center">Access your account</h1>
        <form className="flex flex-col gap-6 mt-10">
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <button 
            type="submit"
            className="bg-sky-500 py-4 px-2 font-medium text-white rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
