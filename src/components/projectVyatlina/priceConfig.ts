export const priceConfig = {
  basePricePerM2: 54_200,
  typeMultipliers: {
    "1 этаж": 1.0,
    "2 этажа": 1.12,
    "2 этажа + гараж": 1.15,
    "Плоская кровля": 1.05,
  } as Record<string, number>,
  distanceAddons: {
    "до 30 км": 0,
    "30–70 км": 85_000,
    "70–100 км": 160_000,
    "100–120 км": 240_000,
  } as Record<string, number>,
  foundationAddons: {
    "Монолитная плита": 0,
    "УШП плита": 120_000,
    "Финский фундамент": 95_000,
    "Ленточный фундамент": 75_000,
  } as Record<string, number>,
  basementPerM2: 18_000,
  wallAddonsPerM2: {
    "Газобетон / Пеноблок": 0,
    "Кирпич": 4_500,
    "Каркас": -3_000,
  } as Record<string, number>,
  slabAddonsPerM2: {
    "Монолитные плиты": 0,
    "Деревянные балки": -1_200,
  } as Record<string, number>,
  roofAddonsPerM2: {
    "Плоская кровля": 0,
    "Металлочерепица": 800,
    "Битумная черепица": 1_200,
  } as Record<string, number>,
  roofInsulationAddonsPerM2: {
    "Без утепления": 0,
    "Минплита 200 мм": 1_400,
  } as Record<string, number>,
  facadeInsulationAddonsPerM2: {
    "Без утепления": 0,
    "Пенополистирол 100 мм": 1_800,
    "Фасадная минплита 100 мм": 2_400,
  } as Record<string, number>,
  facadeAddonsPerM2: {
    "Штукатурка": 1_200,
    "Облицовочный кирпич": 3_500,
    "Комбо (штукатурка + дерево)": 2_800,
  } as Record<string, number>,
  windowAddonsPerM2: {
    "Металлопластиковые": 0,
    "Алюминиевые": 2_000,
    "Деревянные": 3_500,
  } as Record<string, number>,
  stairsAddons: {
    "Деревянная": 0,
    "Металлическая": -60_000,
    "Бетонная": 40_000,
  } as Record<string, number>,
  engineeringPerM2: {
    "Без инженерии": 0,
    "Эконом": 5_500,
    "Стандарт": 10_000,
    "Премиум": 16_000,
  } as Record<string, number>,
  finishPerM2: {
    "Без отделки": 0,
    "Эконом": 8_000,
    "Стандарт": 15_000,
    "Премиум": 28_000,
  } as Record<string, number>,
}
