import '@testing-library/jest-dom';
import LogoAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('LogoAtom.vue', () => {
  it("should have not visible when image pros not set.", () => {
    const component = render(LogoAtom);
    expect(component.queryByTestId(/logoAtomInstance/)).toBeNull();
  });
});