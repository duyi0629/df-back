import { Tabs } from 'antd';
import MarkdownEditor from './MarkdownEditor';
import RichTextEditor from './RichTextEditor';



const EditorSwitch = () => (
  <Tabs
    items={[
      { key: 'markdown', label: 'Markdown', children: <MarkdownEditor /> },
      { key: 'richtext', label: '富文本', children: <RichTextEditor /> }
    ]}
    tabBarStyle={{ borderBottom: 'none' }}
  />
);

export default EditorSwitch