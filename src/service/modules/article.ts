import DFRequest from "..";

interface ArticleProps {
  title: string;
  content: string;
}
export function addArticle(data: ArticleProps) {
  return DFRequest.post({
    url: "/article",
    data: data,
  });
}

export function getArticleList() {
  return DFRequest.get({
    url: "/article",
  });
}
