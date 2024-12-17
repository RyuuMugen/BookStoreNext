// ProductCard.js
"use client";
import { Article, ArticleCategoryList, DataArticle } from "@/model/DataArticle";
import style from "./productCard.module.scss";

import { Image } from "@mantine/core";
import { useCallback, useMemo } from "react";
import LinkCommon from "@/common/LinkCommon";
import Link from "next/link";
import moment from "moment";
import { IconClock, IconUserCircle } from "@tabler/icons-react";

interface ArticleCardProps {
  data: Article;
  type: "row" | "col" | "carousel-col" | "carousel-row";
  height?: string;
  summary?: boolean;
  dataCategory?: ArticleCategoryList[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  data,
  type,
  height,
  summary,
  dataCategory,
}) => {
  const formatDateString = useCallback((isoString: string) => {
    const date = new Date(isoString);
    const adjustedDate = date.setHours(date.getHours() + 7);
    return moment(new Date(adjustedDate)).format("DD-MM-YYYY");
  }, []);

 
  // const h = height ? height : "-webkit-fill-available";
  return (
    <Link
      className={style[type]}
      href={`/news/${data?.id}`}
      
    >
      <div className={style.imgBox}>
        <Image src={`http://localhost:3001${data?.avatar}`} alt="a" />
      </div>
      <div className={style.titleBox}>
        

        <p className={style.titleP}>
          <p className={style.titleSpan}>{data?.title}</p>
          {summary && <span className={style.summary}>{data?.short_description}</span>}
        </p>
      </div>
      {type === "row" && (
        <div className={style.moreInfo}>
          
          <div>
            <IconClock size={16} />
            <p>{formatDateString(data?.created_at ?? "")}</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ArticleCard;