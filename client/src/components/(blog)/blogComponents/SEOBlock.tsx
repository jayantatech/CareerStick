import React from "react";

interface SEOBlockProps {
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
  onChange: (seo: {
    title: string;
    description: string;
    canonicalUrl: string;
  }) => void;
}

export default function SEOBlock({ seo, onChange }: SEOBlockProps) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
      <h2 className="text-xl font-bold text-gray-800">SEO Optimization</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          SEO Title (Recommended: 50-60 characters)
        </label>
        <input
          type="text"
          value={seo.title}
          onChange={(e) => onChange({ ...seo, title: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter SEO Title (e.g., Best Practices for Web Development in 2024)"
          maxLength={70}
        />
        <p className="text-xs text-gray-500">
          {seo.title.length} / 70 characters
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Meta Description (Recommended: 150-160 characters)
        </label>
        <textarea
          value={seo.description}
          onChange={(e) => onChange({ ...seo, description: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Write a concise summary of your blog post that will appear in search results"
          maxLength={160}
        />
        <p className="text-xs text-gray-500">
          {seo.description.length} / 160 characters
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Canonical URL
        </label>
        <input
          type="url"
          value={seo.canonicalUrl}
          onChange={(e) => onChange({ ...seo, canonicalUrl: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the canonical URL for this blog post (e.g., https://mywebsite.com/post-slug)"
        />
      </div>
    </div>
  );
}
