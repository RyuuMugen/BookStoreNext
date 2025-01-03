"use client";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

import { TblProduct } from "@/model/TblBook";

interface BannerCarouselDemoProps {
  data: TblProduct[];
  rows: number;
  auto?: boolean;
  minWidth?: boolean;
  detail?: boolean;
}
const ProductCarouselSale: React.FC<BannerCarouselDemoProps> = ({
  data,
  rows,
  auto,
  minWidth,
  detail,
}) => {
  const OPTIONS: EmblaOptionsType = { align: "start" };
  return (
    <>
      <EmblaCarousel
        data={data || []}
        options={OPTIONS}
        rows={rows}
        auto={auto}
        minWidth={minWidth}
        detail={detail}
      />
    </>
  );
};

export default ProductCarouselSale;
