"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, ImageIcon, Loader2 } from 'lucide-react'
import { useState, useRef } from 'react'

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'rounded-xl max-w-full my-4 border border-slate-200',
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none min-h-[300px] p-4 bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (err) {
      console.error(err);
      alert('Gagal mengupload gambar');
    } finally {
      setUploading(false);
      // Reset input value so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toolbarButtonClass = "p-2 rounded hover:bg-slate-100 text-slate-600 transition-colors";
  const activeClass = "bg-primary/10 text-primary hover:bg-primary/20";

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${toolbarButtonClass} ${editor.isActive('bold') ? activeClass : ''}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${toolbarButtonClass} ${editor.isActive('italic') ? activeClass : ''}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        
        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${toolbarButtonClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${toolbarButtonClass} ${editor.isActive('heading', { level: 3 }) ? activeClass : ''}`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${toolbarButtonClass} ${editor.isActive('bulletList') ? activeClass : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${toolbarButtonClass} ${editor.isActive('orderedList') ? activeClass : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`${toolbarButtonClass} flex items-center gap-2`}
          title="Upload Image"
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
          <span className="text-xs font-bold uppercase tracking-wider">Add Image</span>
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
