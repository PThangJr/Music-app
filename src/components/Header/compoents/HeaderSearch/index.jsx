import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { removeVietnameseTones } from "../../../../js/scripts";
import InputField from "../../../Form/FormField/InputField";
import "./styles.scss";
const HeaderSearch = () => {
  const history = useHistory();
  // const dispatch = useDispatch();

  const [dataKeyword, setDataKeyword] = useState({});
  const handleChangeSearch = (values) => {
    // dispatch(fetchSearch({ keyword: values.keyword }));
    setDataKeyword({ ...dataKeyword, ...values });
  };
  const handleSubmitFormSearch = (e) => {
    e.preventDefault();
    if (dataKeyword.keyword.trim()) {
      const keyword = removeVietnameseTones(dataKeyword.keyword);
      history.push({
        pathname: "/results",
        search: `?keyword=${keyword}`,
      });
    }
  };
  return (
    <form className="search" onSubmit={handleSubmitFormSearch}>
      <div className="search-content">
        <InputField
          placeholder="Nhập từ khóa tìm kiếm..."
          name="keyword"
          onChange={handleChangeSearch}
          className="search-content__input"
          // debounce
        />
        {/* <div className="search-results">
          <CardSearch />
        </div> */}
      </div>
      <button
        className="btn btn--primary btn--full-height btn--green btn--search search-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

HeaderSearch.propTypes = {};

export default HeaderSearch;
