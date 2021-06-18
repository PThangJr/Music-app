import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CBoxField from "../../../../components/Form/FormField/CBoxField";
import InputField from "../../../../components/Form/FormField/InputField";
import {
  clearMessageAndErrorSinger,
  fetchCreateSinger,
} from "../../singersSlice";

const FormSingerControls = () => {
  const dispatch = useDispatch();
  const [dataInput, setDataInput] = useState({});
  const [isAuthor, setIsAuthor] = useState({});
  const handleChangeInput = (values) => {
    setDataInput({ ...dataInput, ...values });
  };
  const handleChangeIsAuthor = (values) => {
    setIsAuthor({ ...isAuthor, ...values });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataInput);
    console.log(isAuthor);
    const data = { ...dataInput, ...isAuthor };
    dispatch(fetchCreateSinger(data));
  };
  const singers = useSelector((state) => state.singers);
  useEffect(() => {
    if (singers.errors) {
      toast.error(singers.errors, {
        onClose: () => dispatch(clearMessageAndErrorSinger()),
      });
    } else if (singers.message) {
      toast.success(singers.message, {
        onClose: () => dispatch(clearMessageAndErrorSinger()),
      });
    }
  }, [dispatch, singers.errors, singers.message]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-6">
          <InputField
            onChange={handleChangeInput}
            name="name"
            placeholder="Nhập tên ca sĩ..."
            fullWidth
          />
          <InputField
            onChange={handleChangeInput}
            name="linkImage"
            placeholder="Nhập Link Image..."
            fullWidth
          />
          <InputField
            onChange={handleChangeInput}
            name="profile"
            placeholder="Nhập Profile..."
            fullWidth
          />
          <CBoxField
            onChange={handleChangeIsAuthor}
            name="isAuthor"
            label="isAuthor"
          />
          <button type="submit" className="btn btn--full-width btn--blue">
            Thêm ca sĩ
          </button>
        </div>
      </div>
    </form>
  );
};

FormSingerControls.propTypes = {};

export default FormSingerControls;
