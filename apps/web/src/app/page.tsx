'use client';
import Image from "next/image";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from "react";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function Home() {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };
  return (
    <main className="flex max-w-3xl mx-auto flex-col items-center justify-between p-14">
      <h1 className="text-4xl font-black mb-4">Upload a Paper</h1>
      <h3 className="text-md text-muted-foreground font-light mb-6 w-2/3 mx-auto text-center">Summarize research papers, create flashcards, and take quizzes</h3>
      <div className="flex flex-col items-center justify-center bg-white py-5 px-10 rounded-md border border-gray-200 w-3/4">
        <Dropzone
          maxFiles={1}
          onDrop={handleDrop}
          onError={console.error}
          src={files}
          className="h-52"
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        <Separator className="my-5" />
        <Input type="text" placeholder="Paste an arkXiv link here" className="bg-gray-50 py-5" />
      </div>
      <Button className="w-3/4 my-5 py-5 text-sm rounded-lg">Submit & Analze</Button>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By uploading , you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </main>
  );
}
