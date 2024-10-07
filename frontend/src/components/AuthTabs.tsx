import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "@/components/LoginCard";
import RegisterCard from "@/components/RegisterCard";

export default function AuthTabs() {
  return (
    <>
      <Tabs defaultValue="login" className="w-1/3 mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginCard />
        </TabsContent>
        <TabsContent value="register">
          <RegisterCard />
        </TabsContent>
      </Tabs>
    </>
  );
}
