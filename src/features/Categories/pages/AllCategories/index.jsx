import React from "react";
import { useSelector } from "react-redux";
import CardCategory from "../../../../components/CardCategory";
import CardSkeletons from "../../../../components/Card/loading/CardSkeletons";
import "./styles.scss";

const AllCategories = (props) => {
  const categories = useSelector((state) => state.categories);
  return (
    <div className="categories">
      <div className="categories-header">
        <h3 className="heading-15 categories-header__heading">Thể loại</h3>
      </div>
      <div className="row">
        {categories.isLoading ? (
          <CardSkeletons
            totalItems={10}
            className="col-xl-2-5 col-lg-3 col-md-4 col-sm-4 col-6"
          />
        ) : (
          categories.data.map((category) => {
            return (
              <div
                key={category?._id + "category-page"}
                className="col-xl-2-5 col-lg-3 col-md-4 col-sm-4 col-6"
              >
                <CardCategory category={category} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

AllCategories.propTypes = {};

export default AllCategories;
