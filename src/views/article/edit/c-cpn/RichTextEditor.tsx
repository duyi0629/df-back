// src/components/RichTextEditor.tsx
import React, { useRef, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = ({ value, onChange }: { value?: string; onChange?: (html: string) => void }) => {
  const editorRef = useRef<any>(null);
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      const contentBlock = htmlToDraft(value);
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlock.contentBlocks)
      );
    }
    return EditorState.createEmpty();
  });

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    onChange?.(html);
  };

  return (
    <div
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        padding: '16px 8px',
        minHeight: 500,
      }}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'image'],
          inline: { 
            options: ['bold', 'italic', 'underline', 'strikethrough'],
            bold: { className: 'custom-bold' },
          },
          image: {
            uploadEnabled: true,
            uploadCallback: (file:any) => {
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve({ data: { link: e.target?.result } });
                reader.readAsDataURL(file);
              });
            },
          },
        }}
        toolbarStyle={{
          border: 'none',
          background: '#f5f5f5',
          borderRadius: 8,
          marginBottom: 16,
        }}
        editorStyle={{
          padding: '0 16px',
          lineHeight: 2,
        }}
        placeholder="开始写作（支持拖拽图片上传）..."
        localization={{ locale: 'zh' }}
      />
    </div>
  );
};

export default RichTextEditor;