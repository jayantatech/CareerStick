"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  doFollow: boolean;
}

interface DescriptionBlockProps {
  content: { html: string; links: Link[] };
  onChange: (content: { html: string; links: Link[] }) => void;
}

export default function DescriptionBlock({
  content,
  onChange,
}: DescriptionBlockProps) {
  const [html, setHtml] = useState(content.html || "");
  const [links, setLinks] = useState<Link[]>(content.links || []);

  useEffect(() => {
    setHtml(content.html || "");
    setLinks(content.links || []);
  }, [content.html, content.links]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "ordered",
    "bullet",
    "link",
  ];

  const handleChange = (value: string) => {
    setHtml(value);
    onChange({ html: value, links });
  };

  const addLink = (linkData: Link) => {
    const updatedLinks = [...links, linkData];
    setLinks(updatedLinks);
    onChange({ html, links: updatedLinks });
  };

  const updateLink = (index: number, linkData: Partial<Link>) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, ...linkData } : link
    );
    setLinks(updatedLinks);
    onChange({ html, links: updatedLinks });
  };

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onChange({ html, links: updatedLinks });
  };

  return (
    <div className="space-y-4 border p-2 rounded shadow">
      <h3 className="text-xl font-semibold font-heading">
        Blog Post Description
      </h3>
      <div className="border rounded-md overflow-hidden">
        <ReactQuill
          value={html}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="min-h-[300px]"
          style={{ height: "300px" }}
          placeholder="Write a brief description or summary of your blog post..."
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-bold">Links</h4>
        {links.map((link, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={link.text}
              onChange={(e) => updateLink(index, { text: e.target.value })}
              className="flex-grow p-2 border rounded"
              placeholder="Link text"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => updateLink(index, { url: e.target.value })}
              className="flex-grow p-2 border rounded"
              placeholder="URL"
            />
            <select
              value={link.type}
              onChange={(e) =>
                updateLink(index, {
                  type: e.target.value as "internal" | "external",
                })
              }
              className="p-2 border rounded"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={link.doFollow}
                onChange={(e) =>
                  updateLink(index, { doFollow: e.target.checked })
                }
                className="mr-2"
              />
              Do Follow
            </label>
            <button
              onClick={() => removeLink(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addLink({
              text: "",
              url: "",
              type: "internal",
              doFollow: true,
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Link
        </button>
      </div>
    </div>
  );
}
