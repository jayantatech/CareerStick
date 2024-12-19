"use server";
import { Metadata } from "next";

function setMetadata(title: string, description: string) {
  const MetaData: Metadata = {
    title: title,
    description: description,
  };

  return MetaData;
}

export { setMetadata };
