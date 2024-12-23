import { Banner } from "@/model/Banner";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";
interface dataProps {
  data: Banner[];
}
const BannerCarousel: React.FC<dataProps> = ({ data }) => {
  const OPTIONS: EmblaOptionsType = {};
  
  return (
    <>
      <EmblaCarousel slides={data} options={OPTIONS} />
    </>
  );
};

export default BannerCarousel;
