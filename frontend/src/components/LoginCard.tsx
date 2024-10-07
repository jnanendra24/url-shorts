import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginCard() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      toast({
        title: "Please fill all the fields",
        description: "Username and password cannot be empty",
        variant: "destructive",
      });
      return;
    }
    const reqBody = { username, password };
    try {
      try {
        const res = await fetch("http://localhost:8000/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        if (res.ok) {
          toast({
            title: "Login Successful",
            description: "You have been logged in",
            variant: "default",
          });
          const data = await res.json();
          localStorage.setItem("token", data.token);
        } else {
          toast({
            title: "Login Failed",
            description: "Please check your credentials",
            variant: "destructive",
          });
        }
      } catch (e: any) {
        console.error(e);
        toast({
          title: e?.message || "An error occurred",
          description: "Please try again!",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        title: e?.message || "An error occurred",
        description: "Please try again!",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Fill the following to Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col space-y-4"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              ref={usernameRef}
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter your Password"
              ref={passwordRef}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
