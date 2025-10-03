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
      <div className="flex w-full flex-col items-center justify-center bg-white py-14 px-10 rounded-md border border-gray-200">
        <Dropzone
          maxFiles={3}
          onDrop={handleDrop}
          onError={console.error}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        <Separator className="my-5" />
        <Input type="text" placeholder="Paste an arkXiv link here" className="bg-gray-50" />
      </div>
      <Button className="w-full mt-5 py-5 text-sm rounded-lg">Submit & Analze</Button>
    </main>
  );
}
