import { describe, expect, it } from 'vitest';
import { LAYOUTS, THEMES } from '../lib/themes';

describe('theme configuration', () => {
  it('defines 10 themes with required fields', () => {
    expect(THEMES).toHaveLength(10);

    for (const theme of THEMES) {
      expect(theme.id).toBeTruthy();
      expect(theme.name).toBeTruthy();
      expect(theme.dataAttr).not.toBeUndefined();
      expect(theme.bgPrimary).toBeTruthy();
      expect(theme.accentHex).toBeTruthy();
    }
  });

  it('defines 5 layouts', () => {
    expect(LAYOUTS).toHaveLength(5);
  });
});
