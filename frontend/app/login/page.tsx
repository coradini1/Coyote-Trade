import styles from "./styles.module.css";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginModal />
    </main>
  );
}

function LoginModal() {
  return (
    <div className={styles.modalCard}>
      <h1>Acesse sua conta</h1>
      <input placeholder="Email" />
      <input placeholder="Senha" />
      <p>
        Esqueceu sua senha?{" "}
        <a href="#" style={{ color: "rgb(114, 135, 253)" }}>redefinir senha</a>
      </p>
    <button>Log in</button>
    </div>
  );
}
