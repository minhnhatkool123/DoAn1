import React, { useState } from 'react';
import ReactPaginate from "react-paginate";
import '../scss/test.scss';

function Test2() {
  const [page, setPage] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = page * productsPerPage;
  const pageCount = Math.ceil(80 / productsPerPage);

  const handlePageChange = ({ selected }) => {
    console.log('page click: ', selected);
    setPage(selected);
  };

  return (
    <div className="test">
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"paginated-btn"}
        breakClassName={"paginated-btn"}
        previousClassName={"prev-btn"}
        nextClassName={"next-btn"}
        disabledClassName={"disabled-btn"}
        activeClassName={"active-btn"}
      />
    </div>
  )
}

export default Test2
