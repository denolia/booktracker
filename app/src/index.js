import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const productsGenerator = (quantity = 5, callback) => {
    if (callback) return Array.from({ length: quantity }, callback);
  
    // if no given callback, retrun default product format.
    return (
      Array.from({ length: quantity }, (value, index) => ({
        id: index,
        name: `Item name ${index}`,
        price: 2100 + index
      }))
    );
  };

const products = productsGenerator();
  

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

ReactDOM.render(
  <BootstrapTable bootstrap4  keyField='id' data={ products } columns={ columns } />,
  document.getElementById('root')
);