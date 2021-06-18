import PropTypes from "prop-types";
import React from "react";
import Modal from "react-modal";
import "./styles.scss";
const ModalControls = (props) => {
  const { headingText, children, handleChangeStatusModal, isOpen } = props;

  return (
    <div className="controls">
      <Modal
        isOpen={isOpen}
        aria={{
          labelledby: "heading",
          //   describedby: "full_description",
        }}
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            width: "100%",
            height: "500px",
            top: "50%",
            left: "50%",
            padding: "20px 40px",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
          },
        }}
      >
        <div className="controls-header">
          <h4 className="controls-header__heading">{headingText}</h4>
          <button className="btn btn--danger" onClick={handleChangeStatusModal}>
            Thoát
          </button>
        </div>
        {children}
      </Modal>
    </div>
  );
};

ModalControls.propTypes = {
  headingText: PropTypes.string,
  handleChangeStatusModal: PropTypes.func.isRequired,
};

export default ModalControls;
