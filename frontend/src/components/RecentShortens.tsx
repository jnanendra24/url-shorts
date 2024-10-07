import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
type RecentShortenObject = {
  _id: string;
  _v: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
};

const fetchRecent = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recent/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: [RecentShortenObject] = await res.json();
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
export default function RecentShortens() {
  const [recentShortens, setRecentShortens] = useState<
    [RecentShortenObject] | null
  >(null);
  useEffect(() => {
    fetchRecent().then((data) => {
      setRecentShortens(data);
    });
  }, []);
  const { toast } = useToast();
  return (
    <>
      <Table className="w-1/2 m-auto">
        <TableCaption>A list of your recent shortened urls.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Original Url</TableHead>
            <TableHead>Short Url</TableHead>
            <TableHead className="texxxt-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentShortens &&
            recentShortens.map((shorten, index) => (
              <TableRow key={shorten._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  className="text-wrap w-96 hover:cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(shorten.originalUrl);
                  }}
                >
                  {shorten.originalUrl}
                </TableCell>
                <TableCell
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${import.meta.env.VITE_API_URL}/${shorten.shortCode}`
                    );
                    toast({
                      title: "Copied to clipboard",
                      variant: "default",
                    });
                  }}
                >
                  {shorten.shortCode}
                </TableCell>
                <TableCell className="text-right">
                  {shorten.createdAt}
                </TableCell>
              </TableRow>
            ))}
          {!recentShortens && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No recent shortens found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
