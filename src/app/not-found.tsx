"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, FileQuestion, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="from-background to-muted flex min-h-screen items-center justify-center bg-linear-to-br p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <FileQuestion className="text-primary h-8 w-8" />
          </div>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="text-lg">
            Halaman Tidak Ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin
            telah dipindahkan.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Halaman Sebelumnya
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
