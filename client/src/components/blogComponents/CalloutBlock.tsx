import React from "react";

interface CalloutBlockProps {
  content: {
    type: "info" | "warning" | "tip" | "note";
    title: string;
    content: string;
    icon: string;
    links: {
      text: string;
      url: string;
      type: "internal" | "external";
      openInNewTab: boolean;
    }[];
  };
  onChange: (content: CalloutBlockProps["content"]) => void;
}

export default function CalloutBlock({ content, onChange }: CalloutBlockProps) {
  const addLink = () => {
    onChange({
      ...content,
      links: [
        ...content.links,
        { text: "", url: "", type: "internal", openInNewTab: false },
      ],
    });
  };

  const updateLink = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const newLinks = [...content.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ ...content, links: newLinks });
  };

  const removeLink = (index: number) => {
    const newLinks = content.links.filter((_, i) => i !== index);
    onChange({ ...content, links: newLinks });
  };

  return (
    <div className="space-y-2">
      <select
        value={content.type}
        onChange={(e) =>
          onChange({
            ...content,
            type: e.target.value as "info" | "warning" | "tip" | "note",
          })
        }
        className="p-2 border rounded"
      >
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="tip">Tip</option>
        <option value="note">Note</option>
      </select>
      <input
        type="text"
        value={content.title}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Title"
      />
      <textarea
        value={content.content}
        onChange={(e) => onChange({ ...content, content: e.target.value })}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Content"
      />
      <input
        type="text"
        value={content.icon}
        onChange={(e) => onChange({ ...content, icon: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Icon (e.g., 'info-circle')"
      />
      <div className="space-y-2">
        <h4 className="font-bold">Links</h4>
        {content.links.map((link, index) => (
          <div key={index} className="space-y-1">
            <input
              type="text"
              value={link.text}
              onChange={(e) => updateLink(index, "text", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Link text"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => updateLink(index, "url", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="URL"
            />
            <select
              value={link.type}
              onChange={(e) => updateLink(index, "type", e.target.value)}
              className="p-2 border rounded"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={link.openInNewTab}
                onChange={(e) =>
                  updateLink(index, "openInNewTab", e.target.checked)
                }
                className="mr-2"
              />
              Open in new tab
            </label>
            <button
              onClick={() => removeLink(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove Link
            </button>
          </div>
        ))}
        <button
          onClick={addLink}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Link
        </button>
      </div>
    </div>
  );
}
