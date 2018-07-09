import { setupShallowTest } from '../../../tests/enzyme-util/shallow';
import { ProductRow } from './component';
import * as TestData from '../../../tests/constants/products';

describe('<ProductRow />', () => {
  const setupShallow = setupShallowTest(ProductRow, () => ({
    product: TestData.TestProduct1
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('shows validation errors', () => {
    const { wrapper } = setupShallow({
      product: {
        ...TestData.TestProduct1,
        validationErrors: {
          sku: 'SKU is invalid'
        }
      }
    });
    expect(wrapper.find('input.invalid[name="sku"]')).toHaveLength(1);
    expect(wrapper.find('p.invalid-hint').filterWhere(n => n.text() === 'SKU is invalid')).toHaveLength(1);
  });

  it('shows row as dirty', () => {
    const { wrapper } = setupShallow({
      product: TestData.UnsavedProduct,
    });
    expect(wrapper.find('.dirty-indicator')).toHaveLength(1);
  });
});
