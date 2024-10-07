import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
function RegisterCard() {
  const { toast } = useToast();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      toast({
        title: "Passwords do not match",
        description: "Please make sure the passwords match",
        variant: "destructive",
      });
      return;
    }
    if (password && password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password should be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    const reqBody = { username, email, password };
    try {
      fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }).then((res) => {
        if (res.ok) {
          toast({
            title: "Registration Successful",
            description: "You can proceed with login",
            variant: "default",
          });
        } else {
          toast({
            title: "Login Failed",
            description: "Please check your credentials",
            variant: "destructive",
          });
        }
      });
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
          <CardTitle>Register</CardTitle>
          <CardDescription>Fill the following to Register</CardDescription>
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
              type="email"
              name="email"
              placeholder="Enter your Email"
              ref={emailRef}
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter your Password"
              ref={passwordRef}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              ref={confirmPasswordRef}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default RegisterCard;
