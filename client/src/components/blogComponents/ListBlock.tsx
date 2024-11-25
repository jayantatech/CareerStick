import React from "react";

interface ListBlockProps {
  content: { type: "bullet" | "numbered" | "checklist"; items: string[] };
  onChange: (content: {
    type: "bullet" | "numbered" | "checklist";
    items: string[];
  }) => void;
}

export default function ListBlock({ content, onChange }: ListBlockProps) {
  const addItem = () => {
    onChange({ ...content, items: [...content.items, ""] });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...content.items];
    newItems[index] = value;
    onChange({ ...content, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_, i) => i !== index);
    onChange({ ...content, items: newItems });
  };

  return (
    <div className="space-y-2">
      <select
        value={content.type}
        onChange={(e) =>
          onChange({
            ...content,
            type: e.target.value as "bullet" | "numbered" | "checklist",
          })
        }
        className="p-2 border rounded"
      >
        <option value="bullet">Bullet List</option>
        <option value="numbered">Numbered List</option>
        <option value="checklist">Checklist</option>
      </select>
      {content.items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {content.type === "checklist" && (
            <input type="checkbox" className="form-checkbox" />
          )}
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={() => removeItem(index)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Item
      </button>
    </div>
  );
}
