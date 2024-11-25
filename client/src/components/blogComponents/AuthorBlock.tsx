import React from 'react'

interface AuthorBlockProps {
  author: { name: string; bio: string; avatar: string }
  onChange: (author: { name: string; bio: string; avatar: string }) => void
}

export default function AuthorBlock({ author, onChange }: AuthorBlockProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Author Information</h2>
      <input
        type="text"
        value={author.name}
        onChange={(e) => onChange({ ...author, name: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Author Name"
      />
      <textarea
        value={author.bio}
        onChange={(e) => onChange({ ...author, bio: e.target.value })}
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Author Bio"
      />
      <input
        type="text"
        value={author.avatar}
        onChange={(e) => onChange({ ...author, avatar: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Avatar URL"
      />
    </div>
  )
}

