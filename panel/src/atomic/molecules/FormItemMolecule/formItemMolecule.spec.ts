import '@testing-library/jest-dom';
import FormItemMolecule from './index.vue';
import { render } from '@testing-library/vue';

describe('FormItemMolecule.vue', () => {
  it("should have not visible label when label props not set", () => {
    const component = render(FormItemMolecule);
    expect(component.queryByTestId(/formItemMoleculeInstance/)).toBeNull();
  });

  it("should have set label 'test' when props label set", () => {
    const component = render(FormItemMolecule, {
      props: {
        label: 'test',
      },
    });
    const label = component.getByTestId('formItemMoleculeInstance');
    expect(label).toHaveTextContent('test');
  });

  it("should have not visible error when errorMessage props not set", () => {
    const component = render(FormItemMolecule);
    expect(component.queryByTestId(/formItemErrorMoleculeInstance/)).toBeNull();
  });

  it("should have set error message 'test' when props errorMessage set", () => {
    const component = render(FormItemMolecule, {
      props: {
        errorMessage: 'test',
      },
    });
    const error = component.getByTestId('formItemErrorMoleculeInstance');
    expect(error).toHaveTextContent('test');
  });

  it("should have set error message lable set class FormItemMolecule__label--error", () => {
    const component = render(FormItemMolecule, {
      props: {
        label: 'test',
        errorMessage: 'test',
      },
    });
    const label = component.getByTestId('formItemMoleculeInstance');
    expect(label.className.includes('FormItemMolecule__label--error')).toEqual(true);
  });
});