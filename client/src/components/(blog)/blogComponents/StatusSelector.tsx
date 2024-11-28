import React from "react";

interface StatusSelectorProps {
  status: string;
  onChange: (status: string) => void;
}

export default function StatusSelector({
  status,
  onChange,
}: StatusSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Post Status</h2>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  );
}
