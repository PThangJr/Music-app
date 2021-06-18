import PropTypes from "prop-types";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./styles.scss";
const Pagination = ({
  currentPage,
  totalPage,
  pageRangeDisplay = 5,
  formatPage = "page",
}) => {
  // console.log(currentPage, pageRangeDisplay, totalPage);
  const history = useHistory();
  const location = useLocation();
  currentPage = (Number.isInteger(currentPage) && currentPage) || 1;
  let listPage = [];
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(pageRangeDisplay);
  for (let i = 1; i <= totalPage; i++) {
    listPage.push(i);
  }
  // console.log(startPage, endPage, currentPage);
  // console.log('pagination', useLocation());
  useEffect(() => {
    if (totalPage) {
      if (
        currentPage >= pageRangeDisplay &&
        currentPage > totalPage - pageRangeDisplay + 1
      ) {
        // console.log('TH1');
        setStartPage(totalPage - pageRangeDisplay);
        setEndPage(totalPage);
      } else if (
        (currentPage > 2 ||
          (currentPage > 2 && currentPage === totalPage - pageRangeDisplay)) &&
        totalPage > pageRangeDisplay
      ) {
        // console.log('TH2');
        setStartPage(currentPage - 2); // - 3
        setEndPage(currentPage + pageRangeDisplay - 2); // + 2
      } else if (currentPage <= 2 || totalPage <= pageRangeDisplay) {
        // console.log('TH3');
        setStartPage(0);
        setEndPage(pageRangeDisplay);
      }
    }
  }, [currentPage, startPage, endPage, totalPage, pageRangeDisplay]);
  listPage = listPage.slice(startPage, endPage);
  // console.log(startPage, endPage);
  const queryObject = queryString.parse(location.search);
  const handlePagination = (page) => {
    queryObject[formatPage] = page;
    history.push({
      pathname: history.location.pathname,
      // search: `page=${item}`,
      search: queryString.stringify(queryObject),
    });
  };
  return (
    <div className="pagination">
      {listPage.length > 0 && (
        <ul className="pagination-list">
          <div
            // to={`?page=${currentPage === 1 ? 1 : currentPage - 1}`}
            onClick={() => {
              if (currentPage > 1) {
                return handlePagination(currentPage - 1);
              }
            }}
            className={
              currentPage === 1 ? "previous-page page-active" : "previous-page"
            }
          >
            <i className="fas fa-chevron-left"></i>
          </div>
          {listPage.map((item, index) => {
            return (
              <div
                onClick={() => handlePagination(item)}
                key={index}
                // to={`?page=${item}`}
                className={
                  currentPage === item
                    ? "pagination-item pagination-item--active"
                    : "pagination-item"
                }
              >
                {item}
              </div>
            );
          })}
          <div
            onClick={() => {
              if (currentPage < totalPage) {
                return handlePagination(currentPage + 1);
              }
            }}
            // to={`?page=${currentPage === totalPage ? totalPage : currentPage + 1}`}
            className={
              currentPage === totalPage ? "next-page page-active" : "next-page"
            }
          >
            <i className="fas fa-chevron-right"></i>
          </div>
        </ul>
      )}
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
};

export default Pagination;
