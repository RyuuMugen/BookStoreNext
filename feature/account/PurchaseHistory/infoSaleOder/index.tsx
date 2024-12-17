import {
  Box,
  Button,
  Flex,
  NumberFormatter,
  Space,
  Table,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import imageNull from "@/assets/noValue.png";
import OrderList from "./ListItemOrder";
import OrderCancel from "./CancelOrder";
import style from "./infoSaleOder.module.scss";
import ReGenQR from "@/common/ReGenQR";
import { tblSaleOrderCommand } from "@/model/TblSaleOrder";
import Image from "next/image";

type InfoSaleOderProps = {
  dataSaleOder: tblSaleOrderCommand[];
  handleFetchDataSaleOder: () => void;
};

const InfoSaleOder = ({
  dataSaleOder,
  handleFetchDataSaleOder,
}: InfoSaleOderProps) => {
  const [limit, setLimit] = useState(6);

  const handleMore = () => {
    // Kiểm tra nếu limit + 4 lớn hơn độ dài của dữ liệu
    if (limit + 4 > dataSaleOder.length) {
      // Nếu đúng, đặt limit bằng độ dài của dữ liệu
      setLimit(dataSaleOder.length);
    } else {
      // Nếu không, tăng limit lên 4
      setLimit(limit + 4);
    }
  };
  const handleHidden = () => {
    if (limit > 6 && limit <= 9) {
      setLimit(6);
    } else if (limit > 9) {
      setLimit(limit - 4);
    }
  };

  const statusCheck = (status: string) => {
    switch (status) {
      case "NEW":
        return "Đơn hàng chờ duyệt";
      // Bạn có thể thêm các trường hợp khác nếu cần
      case "WAIT_SHIPPING":
        return "Đang chuyển hàng";
      case "SUCCESS":
        return "Đơn hàng đã hoàn thành";
      case "CANCEL":
        return "Đơn hàng đã bị hủy";
      case "QRCODE_GEN_FALL":
        return "Lấy QR thanh toán thất bại";
      case "QRCODE_PAY_SUCCESS":
        return "Đã thanh toán QR";
      case "QRCODE_GEN_SUCCESS":
        return "Chưa thanh toán QR";
      case "QRCODE_PAY_FALL":
        return "Thanh toán thất bại";
      default:
        return null;
    }
  };

  function openOrderDetail(data: tblSaleOrderCommand) {
    modals.openConfirmModal({
      title: "Chi tiết đơn hàng",
      size: "1000px",
      radius: "20px",
      centered: true,
      children: <OrderList data={data} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  function openOrderCancel(id: any) {
    modals.openConfirmModal({
      id: "order",
      title: "Huỷ đơn hàng",
      size: "600px",
      radius: "20px",
      centered: true,
      children: <OrderCancel onRefetch={handleFetchDataSaleOder} id={id} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  function reGenQR(data: tblSaleOrderCommand) {
    modals.openConfirmModal({
      title: "Thanh toán lại",
      size: "800px",
      radius: "20px",
      centered: true,
      children: <ReGenQR data={data} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      zIndex: 1000,
      classNames: {
        header: style.header,
        content: style.content,
      },
    });
  }

  return (
    <div>
      <Box className={style.textLeft}>
        <Space h="sm" />
      </Box>
      <div className={style.orderBox}>
        {dataSaleOder?.slice(0, limit).map((item: any, index: any) => {
          return (
            <div key={index} className={style.itemRow}>
              <div className={style.imgBox}>
                <img
                  src={item?.tblSaleOrderDetailModels[0]?.itemImage}
                  alt={"product image"}
                />
              </div>
              <div className={style.contentBox}>
                <div className={style.contentTopBox}>
                  <div className={style.contentTopLeftBox}>
                    <p className={style.item1Name}>
                      {item?.tblSaleOrderDetailModels[0]?.itemName}
                    </p>
                    {item?.tblSaleOrderDetailModels.length > 1 && (
                      <p className={style.totalProduct}>
                        Và {item?.tblSaleOrderDetailModels.length - 1} sản phẩm
                        khác
                      </p>
                    )}

                    <p className={style.itemCode}>Mã đơn hàng: {item?.id}</p>
                    <Text className={style.itemCode}>
                      Trạng thái đơn hàng:
                      <Text className={style.itemCode} span fw={700}>
                        {" "}
                        {statusCheck(item?.orderStatus)}
                      </Text>
                    </Text>
                    <Flex gap={15}>
                      <Box>
                        <Text className={style.itemCode} mt={5} mb={5}>
                          Tổng tiền:{" "}
                          <span className={style.price}>
                            {item.totalRemainingAmount ? (
                              <NumberFormatter
                                thousandSeparator="."
                                decimalSeparator=","
                                value={item?.totalRemainingAmount}
                                suffix="₫"
                              />
                            ) : (
                              <NumberFormatter
                                value={item?.totalAmount}
                                suffix="₫"
                                thousandSeparator="."
                                decimalSeparator=","
                              />
                            )}
                          </span>
                          <Text className={style.itemCode} mt={5} mb={5}>
                            Phí vận chuyển:{" "}
                            <span>
                              <NumberFormatter
                                thousandSeparator="."
                                decimalSeparator=","
                                value={item?.shippingFee}
                                suffix="₫"
                              />
                            </span>
                          </Text>
                        </Text>
                      </Box>
                    </Flex>
                  </div>
                </div>
                <div className={style.contentBotttomBox}>
                  {/* {(item.orderStatus === "QRCODE_GEN_SUCCESS" ||
                    item.orderStatus === "QRCODE_GEN_FALL" ||
                    item.orderStatus === "QRCODE_PAY_FALL") && (
                    <Button
                      variant="default"
                      className={style.title2}
                      fw={700}
                      onClick={() => reGenQR(item)}
                    >
                      Thanh toán lại
                    </Button>
                  )} */}
                  <Button
                    variant="default"
                    className={style.title}
                    fw={700}
                    onClick={() => openOrderDetail(item)}
                  >
                    Xem chi tiết
                  </Button>

                  {item?.orderStatus === "NEW" && (
                    <Button
                      variant="default"
                      className={style.title}
                      bg={"var(--clr-bg-light-red)"}
                      fw={700}
                      onClick={() => openOrderCancel(item?.id)}
                    >
                      Huỷ đơn hàng
                    </Button>
                  )}
                </div>
              </div>

              {/* <div>
                  <Text fw={700}>{item?.orderStatus}</Text>
                </div> */}
            </div>
          );
        })}
      </div>
      {dataSaleOder.length > 6 ? (
        <div className={style.buttonGroup}>
          {limit !== dataSaleOder.length && (
            <button className={style.button} onClick={handleMore}>
              Xem thêm
            </button>
          )}
          {limit !== 6 && (
            <button className={style.button} onClick={handleHidden}>
              Thu gọn
            </button>
          )}
        </div>
      ) : (
        <div className={style.noValue}>
          <Image src={imageNull} alt="" />
          <div>
            <div className={style.customList}>Hiện chưa có đơn hàng nào</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSaleOder;