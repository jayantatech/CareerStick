import React from "react";

interface RelatedPostsBlockProps {
  relatedPosts: string[];
  onChange: (relatedPosts: string[]) => void;
}

export default function RelatedPostsBlock({
  relatedPosts,
  onChange,
}: RelatedPostsBlockProps) {
  const addRelatedPost = () => {
    onChange([...relatedPosts, ""]);
  };

  const updateRelatedPost = (index: number, value: string) => {
    const newRelatedPosts = [...relatedPosts];
    newRelatedPosts[index] = value;
    onChange(newRelatedPosts);
  };

  const removeRelatedPost = (index: number) => {
    const newRelatedPosts = relatedPosts.filter((_, i) => i !== index);
    onChange(newRelatedPosts);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Related Posts</h2>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={post}
            onChange={(e) => updateRelatedPost(index, e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Related Post ID or URL"
          />
          <button
            onClick={() => removeRelatedPost(index)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addRelatedPost}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Related Post
      </button>
    </div>
  );
}
