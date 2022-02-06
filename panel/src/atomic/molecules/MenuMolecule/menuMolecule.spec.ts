import '@testing-library/jest-dom';
import MenuMolecule from './index.vue';
import * as fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/vue';

fetchMock.default.enableMocks();

describe('MenuMolecule.vue', () => {
  it("should have not defualt class horizontal", () => {
    const component = render(MenuMolecule, {
      props: {
        options: {
          home: {
            icon: 'lock',
            label: 'Home',
          },
        },
      },
    });

    const list = component.getByTestId('menuMoleculeListInstance');
    expect(list.className.includes('MenuMolecule__list--horizontal')).toEqual(true);
  });

  ['horizontal', 'vertical'].forEach((typeMenu: string) => {
    it(`should have class ${typeMenu}`, () => {
      const component = render(MenuMolecule, {
        props: {
          typeMenu,
          options: {
            home: {
              icon: 'lock',
              label: 'Home',
            },
          },
        },
      });
  
      const list = component.getByTestId('menuMoleculeListInstance');
      expect(list.className.includes(`MenuMolecule__list--${typeMenu}`)).toEqual(true);

      const item = component.getByTestId('menuMoleculeItemInstance');
      expect(item.className.includes(`MenuMolecule__item--${typeMenu}`)).toEqual(true);
    });
  });

  it("should have not visible icon", () => {
    const component = render(MenuMolecule, {
      props: {
        options: {
          home: {
            label: 'Home',
          },
        },
      },
    });

    expect(component.queryByTestId(/menuMoleculeIconInstance/)).toBeNull();

    const item = component.getByTestId('menuMoleculeItemInstance');
    expect(item.className.includes('MenuMolecule__item--empty')).toEqual(true);
  });

  it("should have active element home when props activeKey is set", () => {
    const component = render(MenuMolecule, {
      props: {
        activeKey: 'home',
        options: {
          home: {
            label: 'Home',
          },
        },
      },
    });

    const item = component.getByTestId('menuMoleculeItemInstance');
    expect(item.className.includes('MenuMolecule__item--active')).toEqual(true);
  });
});