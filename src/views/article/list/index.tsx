import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { memo, useEffect, useState } from "react";
import { getArticleList } from "@/service/modules/article";

interface ArticlePorps {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const ArticleList = memo(() => {
  const [articleList, setArticleList] = useState<ArticlePorps[]>([]);
  useEffect(() => {
    const getArticleListData = async () => {
      const res = await getArticleList();
      if (res.code === 200) {
        setArticleList(res.data);
      }
    };
    getArticleListData();
  }, []);
  return (
    <div className="py-6 px-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>文章标题</TableCell>
            <TableCell className="w-[500px]">文章内容</TableCell>
            <TableCell>创建时间</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articleList.map((article, aIndex) => {
            return (
              <TableRow key={article._id}>
                <TableCell>{aIndex + 1}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell className=" w-[500px] overflow-hidden text-ellipsis whitespace-nowrap inline-block">{article.content}</TableCell>
                <TableCell>{article.createdAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export default ArticleList;
