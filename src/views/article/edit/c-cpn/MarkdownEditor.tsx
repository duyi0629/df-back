// src/components/MarkdownEditor.tsx
import React, { useState } from 'react';
import { Space, Button } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { PreviewType } from '@uiw/react-md-editor/cjs/components/Markdown';

// { value, onChange }: { value?: string; onChange?: (value: string) => void }
const MarkdownEditor = () => {
  const [preview, setPreview] = useState<PreviewType>('live');
  const [value, setValue] = useState('')
 const  onChange = (val:any) => {
    console.log(setValue(val))
  }
  return (
    <div className="markdown-editor" data-color-mode="light">
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button
            type={preview === 'edit' ? 'primary' : 'default'}
            onClick={() => setPreview('edit')}
            icon={<i className="ri-edit-line" />}
          >
            纯编辑
          </Button>
          <Button
            type={preview === 'live' ? 'primary' : 'default'}
            onClick={() => setPreview('live')}
            icon={<i className="ri-layout-column-line" />}
          >
            分屏预览
          </Button>
          <Button
            type={preview === 'preview' ? 'primary' : 'default'}
            onClick={() => setPreview('preview')}
            icon={<i className="ri-eye-line" />}
          >
            全屏预览
          </Button>
        </Space>
      </div>

      <MDEditor
        value={value}
        onChange={(val = '') => onChange?.(val || '')}
        preview={preview}
        height={500}
        visibleDragbar={false}
        extraCommands={[]}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        textareaProps={{
          placeholder: '开始创作吧！支持Markdown语法...',
        }}
      />
    </div>
  );
};

export default MarkdownEditor;