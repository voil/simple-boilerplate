import '@testing-library/jest-dom';
import CardAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('CardAtom.vue', () => {
  it("should have class - CardAtom--primary", () => {
    const component = render(CardAtom);
    const card = component.getByTestId('cardAtomInstance');
    expect(card.className.includes('CardAtom--primary')).toEqual(true);
  });

  ['info',
  'error',
  'default',
  'warning',
  'primary',
  ].forEach(cardType => {
    it(`should have class - CardAtom--${cardType}`, () => {
      const component = render(CardAtom, {
        props: {
          cardType,
        }
      });
      const card = component.getByTestId('cardAtomInstance');
      expect(card.className.includes(`CardAtom--${cardType}`)).toEqual(true);
    });
  });

  it("should have not header when props title or description not exists", () => {
    const component = render(CardAtom);
    expect(component.queryByTestId(/cardAtomHeaderInstance/)).toBeNull();
  });


  it("should have title - 'test' when props cardTitle set", () => {
    const component = render(CardAtom, {
      props: {
        cardTitle: 'test',
      },
    });

    const title = component.getByTestId('cardAtomTitleInstance');
    expect(title).toHaveTextContent('test');
  });

  it("should have description - 'test' when props cardDescription set", () => {
    const component = render(CardAtom, {
      props: {
        cardDescription: 'test',
      },
    });

    const description = component.getByTestId('cardAtomDescriptionInstance');
    expect(description).toHaveTextContent('test');
  });
});