"use client";
import LinkCommon from "@/common/LinkCommon";
import { useMemo } from "react";
import ContentDetail from "./components/ContentDetail/ContentDetail";
import NewsLinkGroup from "./components/NewsLinkGroup";
import Poster from "./components/Poster";
import style from "./newsDetail.module.scss";
import { Article, ArticleCategoryList, DataArticle } from "@/model/DataArticle";
import { TblUserComment } from "@/model/TblUserComment";
import Comments from "@/common/Comments";
import NewsLinkGroup2 from "./components/NewsLinkGroup2";

type newDetail = {
  data: Article;
  dataComment: TblUserComment[] | null;
  dataArticleCategory: ArticleCategoryList[];
  dataArticleNewest: DataArticle[];
};

const NewsDetail = ({
  data,
  dataComment,
  dataArticleCategory,
  dataArticleNewest,
}: newDetail) => {
 

  const formatDateStringToDay = (dateString: any) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
    return formattedDate;
  };

  return (
    <div className={style.newsDetailPage}>
      <div className={style.contentContainer}>
        <div className={style.banner}>
          <img src={`http://localhost:3001${data?.avatar}`} alt="#" />
        </div>
        <div className={style.content}>
          <div className={style.newsContent}>
            <div className={style.mainContent}>
              <h1 className={style.title}>{data?.title}</h1>
              <Poster
                postingDate={formatDateStringToDay(data?.created_at) || ""}
              />
              <ContentDetail data={data} />
              <div className={style.relatedArticles}>
                <h2>Bài viết mới nhất</h2>
                <NewsLinkGroup2 dataArticleNewest={dataArticleNewest} />
              </div>
            </div>
          </div>
          {/* <Comments
            dataArticle={data || null}
            dataComment={dataComment || null}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
