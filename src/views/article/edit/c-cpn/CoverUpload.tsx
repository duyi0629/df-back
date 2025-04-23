import { Upload, Image } from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';

const CoverUpload = () => {
  const [preview, setPreview] = useState<string>();

  const props: UploadProps = {
    listType: 'picture-card',
    maxCount: 1,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result as string);
      return false;
    },
    itemRender: () => null,
  };

  return (
    <div style={{ border: '2px dashed #ddd', borderRadius: 8 }}>
      {preview ? (
        <Image
          src={preview}
          alt="封面预览"
          style={{ borderRadius: 6 }}
          preview={false}
        />
      ) : (
        <Upload {...props}>
          <div style={{ padding: 24 }}>
            <span style={{ color: '#1890ff' }}>点击上传封面图</span>
            <div style={{ marginTop: 8, color: '#999' }}>
              建议尺寸：1200x630px
            </div>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default CoverUpload