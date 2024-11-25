import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from "./Signup.module.css";

interface PostcodeProps {
  onAddressChange: (address: string, detailAddress: string) => void;
}

const Postcode: React.FC<PostcodeProps> = ({ onAddressChange }) => {
  const [zipCode, setZipcode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const completeHandler = (data: any) => {
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpen(false);
    onAddressChange(data.roadAddress, detailAddress);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // 123
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
    onAddressChange(roadAddress, e.target.value);
  };

  return (
      <div>
        <div onClick={toggle}>
          <label className={styles.label_container}>
            <input
                value={roadAddress || zipCode ? `${roadAddress} ${zipCode}` : ""}
                readOnly
                id="address"
                placeholder="우편번호 및 도로명 주소"
                onClick={toggle}
                className={styles.input_value}
            />
          </label>
          <br/>
          <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
            <div>
              <DaumPostcode onComplete={completeHandler}/>
            </div>
          </Modal>
          <br/>
        </div>
        <label className={styles.label_container}>
          <input
              id="detailAddress"
              type="text"
              onChange={changeHandler}
              value={detailAddress}
              placeholder="상세주소"
              className={styles.input_value}
          />
          <br/>
        </label>
        <br/>
      </div>
  );
};

export default Postcode;
