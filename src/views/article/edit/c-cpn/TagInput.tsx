import { Tag, Input, theme } from 'antd';
import { useState } from 'react';


const TagInput = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <Tag 
          key={tag} 
          closable
          style={{ 
            borderRadius: 20, 
            background: token.colorPrimaryBg,
            color: token.colorPrimary
          }}
        >
          {tag}
        </Tag>
      ))}
      <Input
        size="small"
        style={{ width: 100, borderRadius: 20 }}
        placeholder="添加标签"
        onPressEnter={(e) => {
          setTags([...tags, e.currentTarget.value]);
          e.currentTarget.value = '';
        }}
      />
    </div>
  );
};

export default TagInput