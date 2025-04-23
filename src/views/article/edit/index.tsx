import { ProForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import CoverUpload from './c-cpn/CoverUpload';
import EditorSwitch from './c-cpn/EditorSwitch';
import TagInput from './c-cpn/TagInput';

const BlogEditorPage = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <ProForm
        layout="vertical"
        submitter={{ render: (_, dom) => <div style={{ textAlign: 'center' }}>{dom}</div> }}
      >
        {/* 标题与分类 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <ProFormText 
            name="title"
            label="文章标题"
            placeholder="请输入吸引人的标题"
            rules={[{ required: true }]}
            fieldProps={{ size: 'large' }}
          />
          <ProForm.Item
            name="category"
            label="分类选择"
            rules={[{ required: true }]}
          >
            <Segmented
              options={['技术', '生活', '旅行', '科技']}
              size="large"
              block
            />
          </ProForm.Item>
        </div>

        {/* 封面图上传 */}
        <ProForm.Item
          name="cover"
          label="文章封面"
          extra="上传一张吸引眼球的封面图吧！"
        >
          <CoverUpload />
        </ProForm.Item>

        {/* 双模式编辑器 */}
        <ProForm.Item
          name="content"
          label="正文内容"
          rules={[{ required: true, min: 1000 }]}
        >
          <EditorSwitch />
        </ProForm.Item>

        {/* 动态标签 */}
        <ProForm.Item
          name="tags"
          label="文章标签"
          extra="最多添加5个标签"
        >
          <TagInput />
        </ProForm.Item>

        {/* 高级选项 */}
        <ProForm.Item
          label="高级设置"
          tooltip="专业博主必备选项"
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <ProFormDateTimePicker
              name="publishTime"
              label="定时发布"
              width="md"
            />
            <ProFormText
              name="seoKeywords"
              label="SEO关键词"
              placeholder="用逗号分隔"
              width="lg"
            />
          </div>
        </ProForm.Item>
      </ProForm>
    </div>
  );
};


export default BlogEditorPage