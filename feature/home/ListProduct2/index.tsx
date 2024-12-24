"use client";
import ProductCarousel from "@/common/CarouselProductCard";
import HeaderSection from "@/components/HeaderSection";
import { TblProduct } from "@/model/TblBook";

interface dataProps {
  data: TblProduct[];
}
const ListProduct2: React.FC<dataProps> = ({ data }) => {
  const title = "Truyện Tranh";
  
  return (
    <div style={{ padding: "10px 0px" }}>
      <HeaderSection title={title} />
      <ProductCarousel data={data} rows={1} />
    </div>
  );
};

export default ListProduct2;
