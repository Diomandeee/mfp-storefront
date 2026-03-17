import { CARDS, CHAPTERS, getCardsByChapter } from '../lib/card-manifest';

describe('card manifest', () => {
  it('contains 45 cards with required fields populated', () => {
    expect(CARDS).toHaveLength(45);

    for (const card of CARDS) {
      expect(card.id).toBeTruthy();
      expect(card.name).toBeTruthy();
      expect(card.chapter).toBeGreaterThan(0);
      expect(card.chapter_title).toBeTruthy();
      expect(card.triptych_role).toMatch(/^[ABC]$/);
      expect(card.triptych_role_name).toBeTruthy();
      expect(card.theme).toBeTruthy();
      expect(card.theme_icon).toBeTruthy();
      expect(card.theme_color).toBeTruthy();
      expect(card.type).toBeTruthy();
      expect(card.rarity).toBeTruthy();
      expect(card.rarity_stars).toBeGreaterThan(0);
      expect(card.emotional_power).toBeGreaterThan(0);
      expect(card.wisdom_cost).toBeGreaterThan(0);
      expect(card.quote).toBeTruthy();
      expect(card.reflection_prompt).toBeTruthy();
      expect(card.art_direction).toBeTruthy();
    }
  });

  it('returns three cards for every chapter', () => {
    expect(CHAPTERS).toHaveLength(15);

    for (const chapter of CHAPTERS) {
      const cards = getCardsByChapter(chapter.number);
      expect(cards).toHaveLength(3);
      expect(cards.every((card) => card.chapter === chapter.number)).toBe(true);
    }
  });

  it('has no duplicate card IDs', () => {
    const ids = CARDS.map((card) => card.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
