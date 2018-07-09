import * as React from 'react';
import { Product, ValidationErrors } from '../../../core/models/product';

export interface ProductRowProps {
  product: Product;
  handleValueChange: any;
  handleDeprecateClick: any;
}

export interface State {
  validationErrors: ValidationErrors;
  invalid: boolean;
}
export class ProductRow extends React.Component<ProductRowProps, State>{
  constructor(props: ProductRowProps) {
    super(props);
    this.state = {
      validationErrors: props.product.validationErrors || {},
      invalid: Object.keys(props.product.validationErrors).length > 0,
    }
  }

  public render() {
    return (
      <div className="product-table__row">
        <div className="text-col">
          <input type="text"
            className={this.state.validationErrors.displayName ? "form__input invalid" : "form__input"}
            name="displayName"
            required
            maxLength={255}
            value={this.props.product.displayName}
            onChange={this.props.handleValueChange}
          />
          {this.state.invalid &&
            <p className="invalid-hint">
              {this.state.validationErrors.displayName}
            </p>
          }
        </div>
        <div className="text-col">
          <input type="text"
            className={this.state.validationErrors.sku ? "form__input invalid" : "form__input"}
            name="sku"
            required
            maxLength={255}
            disabled={this.props.product.savedInCatalog}
            value={this.props.product.sku}
            onChange={this.props.handleValueChange}
          />
          {this.state.invalid &&
            <p className="invalid-hint">
              {this.state.validationErrors.sku}
            </p>
          }
        </div>
        <div className="text-col">
          <input type="number"
            className={this.state.validationErrors.amount ? "form__input invalid" : "form__input"}
            name="amount"
            required
            min="1" max="10000"
            value={this.props.product.amount}
            onChange={this.props.handleValueChange}
          />
          {this.state.invalid &&
            <p className="invalid-hint">
              {this.state.validationErrors.amount}
            </p>
          }
        </div>
        <div className="select-col">
          <select name="inDevelopment"
              className={this.state.validationErrors.inDevelopment ? "form__input invalid" : "form__input"}
              value={this.props.product.inDevelopment}
              onChange={this.props.handleValueChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {this.state.invalid &&
            <p className="invalid-hint">
              {this.state.validationErrors.inDevelopment}
            </p>
          }
        </div>
        <div className="select-col">
          <select name="broadcast"
              className={this.state.validationErrors.broadcast ? "form__input invalid" : "form__input"}
              value={this.props.product.broadcast}
              onChange={this.props.handleValueChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {this.state.invalid &&
            <p className="invalid-hint">
              {this.state.validationErrors.broadcast}
            </p>
          }
        </div>
        <div className="button-col">
          <button className="product-row__deprecate-button"
              onClick={this.props.handleDeprecateClick}>
            {this.props.product.deprecated ? 'Restore' : 'Deprecate'}
          </button>
          {this.state.invalid && <p className="invalid-hint"></p>}
        </div>
        <div className="dirty-col">
        <div className={this.props.product.dirty ? "dirty-indicator" : "dirty-indicator hidden"}>
          <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'>
            <circle cx='5' cy='5' r='3' />
          </svg>
        </div>
        {this.state.invalid && <p className="invalid-hint"></p>}
        </div>
      </div>
    );

  }
}
