"use client";
import ProductCarousel from "@/common/CarouselProductCard";
import HeaderSection from "@/components/HeaderSection";
import { TblProduct } from "@/model/TblBook";

interface dataProps {
  data: TblProduct[];
}
const ListProductKeySearch: React.FC<dataProps> = ({ data }) => {
  const title = "Top tìm kiếm";
  
  return (
    <div style={{ padding: "10px 0px" }}>
      <HeaderSection title={title} />
      <ProductCarousel data={data} rows={2} />
    </div>
  );
};

export default ListProductKeySearch;
