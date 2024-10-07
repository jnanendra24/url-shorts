import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ShortenerCard() {
  const originalUrlRef = useRef<HTMLInputElement>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");
    const originalUrl = originalUrlRef.current?.value;
    if (!originalUrl) {
      toast({
        title: "Please fill all the fields",
        description: "URL cannot be empty",
        variant: "destructive",
      });
      return;
    }
    const reqBody = {
      original_url: originalUrl,
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shorten/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const data: {
        _id: string;
        _v: number;
        createdAt: string;
        updatedAt: string;
        originalUrl: string;
        shortCode: string;
      } = await res.json();
      if (res.ok) {
        setShortCode(data.shortCode);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: error?.message || "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <Card className="w-full md:w-1/3 md:mx-auto">
        <CardHeader>
          <CardTitle>Shorten a Long Url</CardTitle>
          <CardDescription>With Just One Click!</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col space-y-3"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <Input
              type="url"
              placeholder="Enter long link here"
              ref={originalUrlRef}
              disabled={shortCode !== null}
            />
            {shortCode && (
              <div className="flex flex-col space-y-2">
                <span className="text-lg">Shortened URL</span>
                <div className="flex gap-2">
                  <a
                    href={`${import.meta.env.VITE_API_URL}/${shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className=""
                  >
                    {`${import.meta.env.VITE_API_URL}/${shortCode}`}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${import.meta.env.VITE_API_URL}/${shortCode}`
                      );
                    }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {shortCode && (
              <Button variant="default" onClick={() => setShortCode(null)}>
                Shorten Another
              </Button>
            )}
            {!shortCode && (
              <Button variant="default" type="submit">
                Shorten
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
