import styles from "./styles.module.css";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <Tabs defaultValue="Login" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="Login">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Link href="/change-password">
              <p style={{ color: "white" }}>Redefinir a sua senha</p>
            </Link>
            <Button>Acessar</Button>
          </TabsContent>
          <TabsContent value="password">Preencha sua senha</TabsContent>
        </Tabs>
      </div>
      <div></div>
    </main>
  );
}
