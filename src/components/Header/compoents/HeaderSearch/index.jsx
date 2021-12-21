import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../../../Form/FormField/InputField";
import "./styles.scss";
const HeaderSearch = () => {
  const history = useHistory();
  // const dispatch = useDispatch();

  const [dataKeyword, setDataKeyword] = useState({ keyword: "" });
  const handleChangeSearch = (values) => {
    // dispatch(fetchSearch({ keyword: values.keyword }));
    setDataKeyword({ ...dataKeyword, ...values });
  };
  const handleSubmitFormSearch = (e) => {
    e.preventDefault();
    if (dataKeyword.keyword.trim()) {
      // const keyword = removeVietnameseTones(dataKeyword.keyword.trim());
      const keyword = dataKeyword.keyword.trim();
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
          selectedAllText
          value={dataKeyword.keyword}
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
        <span className="icon">
          <i className="fas fa-search"></i>
        </span>
        <span>Search</span>
      </button>
    </form>
  );
};

HeaderSearch.propTypes = {};

export default HeaderSearch;
