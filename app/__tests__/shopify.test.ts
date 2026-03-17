import { formatPrice, getProductKey } from '../lib/shopify';

describe('shopify utilities', () => {
  describe('formatPrice', () => {
    it('formats a normal amount', () => {
      expect(formatPrice('12.34')).toBe('$12.34');
    });

    it('returns $0.00 when the amount is NaN', () => {
      expect(formatPrice('not-a-number')).toBe('$0.00');
    });

    it('formats zero correctly', () => {
      expect(formatPrice('0')).toBe('$0.00');
    });

    it('formats negative amounts correctly', () => {
      expect(formatPrice('-5')).toBe('-$5.00');
    });
  });

  describe('getProductKey', () => {
    it('matches booster handles', () => {
      expect(getProductKey('mfp-booster-pack')).toBe('booster');
    });

    it('matches chapter handles', () => {
      expect(getProductKey('chapter-pack-volume-1')).toBe('chapter');
    });

    it('matches oracle handles', () => {
      expect(getProductKey('complete-oracle-deck')).toBe('oracle');
    });

    it('matches display handles', () => {
      expect(getProductKey('collector-display-box')).toBe('display');
    });

    it('falls back to oracle when no key matches', () => {
      expect(getProductKey('mfp-mystery-product')).toBe('oracle');
    });
  });
});
