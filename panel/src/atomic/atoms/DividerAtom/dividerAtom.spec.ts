import '@testing-library/jest-dom';
import DividerAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('DividerAtom.vue', () => {
  it("should have visible lines when type is horizontal", () => {
    const component = render(DividerAtom);
    expect(component.queryByTestId(/lineLeftAtomInstance/)).not.toBeNull();
    expect(component.queryByTestId(/lineRightAtomInstance/)).not.toBeNull();
  });

  it("should have no visible right line and left line visible when type is vertical", () => {
    const component = render(DividerAtom, {
      props: {
        dividerType: 'vertical',
      },
    });
    expect(component.queryByTestId(/lineLeftAtomInstance/)).not.toBeNull();
    expect(component.queryByTestId(/lineRightAtomInstance/)).toBeNull();
  });

  it("should have class DividerAtom--vertical when type is vertical", () => {
    const component = render(DividerAtom, {
      props: {
        dividerType: 'vertical',
      },
    });
    const divider = component.getByTestId('dividerAtomInstance');
    expect(divider.className.includes('DividerAtom--vertical')).toEqual(true);

    const line = component.getByTestId('lineLeftAtomInstance');
    expect(line.className.includes('DividerAtom__line--vertical')).toEqual(true);
  });

  it("should have class DividerAtom--color when color is set", () => {
    const component = render(DividerAtom, {
      props: {
        color: '#000000',
      },
    });
    const divider = component.getByTestId('dividerAtomInstance');
    expect(divider.className.includes('DividerAtom--color')).toEqual(true);

    const lineLeft = component.getByTestId('lineLeftAtomInstance');
    expect(lineLeft.className.includes('DividerAtom__line--color')).toEqual(true);

    const lineRight = component.getByTestId('lineRightAtomInstance');
    expect(lineRight.className.includes('DividerAtom__line--color')).toEqual(true);
  });
});