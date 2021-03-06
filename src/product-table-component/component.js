import React, { Component } from 'react'
import { ProductRow } from './product-row';
import { fetchProducts, saveProduct } from '../util/api';
import * as ProductErrors from '../constants/product-errors';
import './component.sass';

const PRODUCT_NUM_LIMIT = 250;

export class ProductTableComponent extends Component {

  componentDidMount() {
    const { clientId, token, loadProductsSuccess, loadProductsFailure } = this.props;
    fetchProducts(
      'api.twitch.tv',
      clientId,
      token,
      loadProductsSuccess,
      loadProductsFailure,
    );
  }

  handleValueChange(index, event) {
    const { changeProductValue } = this.props;
    const value = event.target.value;
    const fieldName = event.target.name;
    changeProductValue(index, fieldName, value);
  }

  handleDeprecateClick(index) {
    const { changeProductValue } = this.props;
    const deprecated = this.props.products[index].deprecated;
    changeProductValue(index, 'deprecated', !deprecated);
  }

  handleAddProductClick() {
    const { addProduct } = this.props;
    addProduct();
  }

  handleSaveProductsClick() {
    const { clientId, token, saveProductsSuccess, saveProductsFailure } = this.props;
    this.props.products.forEach((product, index) => {
      if (product.dirty) {
        saveProduct(
          'api.twitch.tv',
          clientId,
          token,
          product,
          index,
          saveProductsSuccess,
          saveProductsFailure,
        );
      }
    });
  }

  render() {
    const skus = this.props.products.map(p => p.sku);
    const disableAddButton = this.props.products.length >= PRODUCT_NUM_LIMIT;
    let disableSaveButton = false;
    let liveProducts = [];
    let deprecatedProducts = [];

    this.props.products.forEach((p, i) => {
      const matchingSkus = skus.filter(sku => sku === p.sku);
      p.validationErrors = p.validationErrors || {};
      if (matchingSkus.length > 1) {
        p.validationErrors = {
          ...p.validationErrors,
          sku: ProductErrors.SKU_UNIQUE
        }
      } else if (p.validationErrors.sku === ProductErrors.SKU_UNIQUE) {
        delete p.validationErrors.sku;
      }

      if (Object.keys(p.validationErrors).length > 0) {
        disableSaveButton = true;
      }

      const productRowElement = (
        <ProductRow key={i} product={p}
          handleValueChange={this.handleValueChange.bind(this, i)}
          handleDeprecateClick={this.handleDeprecateClick.bind(this, i)}
        />
      );

      if (p.deprecated) {
        deprecatedProducts.push(productRowElement);
      } else {
        liveProducts.push(productRowElement);
      }
    });

    const productTableHeader = (
      <div className="product-table__header">
        <div className="text-col balloon-wrapper">
          Product Name
          <div className="balloon">
            Name to display for this product in your extension.
          </div>
        </div>
        <div className="text-col balloon-wrapper">
          SKU
          <div className="balloon">
            Unique SKU to identify this product.
            Cannot be changed after saving.
            Must not contain whitespace.
          </div>
        </div>
        <div className="text-col balloon-wrapper">
          Amount (in Bits)
          <div className="balloon">
            Amount of Bits to offer this product for.
            Must be between 1 and 10,000.
          </div>
        </div>
        <div className="select-col balloon-wrapper">
          In Development
          <div className="balloon">
            Setting this to yes will cause this product to not be displayed in a released extension.
          </div>
        </div>
        <div className="select-col balloon-wrapper">
          Broadcast
          <div className="balloon">
            Setting this to yes will notify all instances of your extension on a channel when a transaction for this product has completed.
          </div>
        </div>
        <div className="button-col"></div>
        <div className="dirty-col"></div>
      </div>
    );

    return (
      <div className="product-table">
        {this.props.error &&
          <div className="product-table__error">
            <h4>Error getting products.</h4>
            <p>{this.props.error}</p>
          </div>
        }
        {liveProducts.length > 0 &&
          <div>
            <div className="product-table__category">Live</div>
            {productTableHeader}
            {liveProducts}
          </div>        
        }
        {deprecatedProducts.length > 0 &&
          <div>
            <div className="product-table__category">Deprecated</div>
            {productTableHeader}
            {deprecatedProducts}
          </div>
        }
        <div className="product-table__buttons">
          <button className="product-table__add-button"
              onClick={this.handleAddProductClick.bind(this)}
              disabled={disableAddButton}>
            Add Product
          </button>
          <button className="product-table__save-button"
              onClick={this.handleSaveProductsClick.bind(this)}
              disabled={disableSaveButton}>
            Save All
          </button>
        </div>
      </div>
    );
  }
}