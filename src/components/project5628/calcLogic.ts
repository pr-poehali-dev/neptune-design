import { priceConfig } from "./priceConfig"

export interface CalcState {
  type: string
  distance: string
  area: number
  foundation: string
  basement: boolean
  wall: string
  slab: string
  roof: string
  roofInsulation: string
  facadeInsulation: string
  facade: string
  windows: string
  stairs: string
  engineering: string
  finish: string
}

export function calculatePrice(s: CalcState): { total: number; perM2: number } {
  const c = priceConfig
  let base = s.area * c.basePricePerM2

  // Тип этажности
  base *= c.typeMultipliers[s.type] ?? 1

  // Стены (за м²)
  base += s.area * (c.wallAddonsPerM2[s.wall] ?? 0)

  // Перекрытия (за м²)
  base += s.area * (c.slabAddonsPerM2[s.slab] ?? 0)

  // Кровля (за м²)
  base += s.area * (c.roofAddonsPerM2[s.roof] ?? 0)

  // Утепление кровли (за м²)
  base += s.area * (c.roofInsulationAddonsPerM2[s.roofInsulation] ?? 0)

  // Утепление фасада (за м²)
  base += s.area * (c.facadeInsulationAddonsPerM2[s.facadeInsulation] ?? 0)

  // Отделка фасада (за м²)
  base += s.area * (c.facadeAddonsPerM2[s.facade] ?? 0)

  // Окна (за м²)
  base += s.area * (c.windowAddonsPerM2[s.windows] ?? 0)

  // Инженерия (за м²)
  base += s.area * (c.engineeringPerM2[s.engineering] ?? 0)

  // Отделка (за м²)
  base += s.area * (c.finishPerM2[s.finish] ?? 0)

  // Фундамент (фикс)
  base += c.foundationAddons[s.foundation] ?? 0

  // Лестница (фикс)
  base += c.stairsAddons[s.stairs] ?? 0

  // Подвал (за м²)
  if (s.basement) base += s.area * c.basementPerM2

  // Удалённость (фикс)
  base += c.distanceAddons[s.distance] ?? 0

  const total = Math.round(base)
  const perM2 = Math.round(total / s.area)
  return { total, perM2 }
}

export function formatRub(n: number): string {
  return n.toLocaleString("ru-RU") + " ₽"
}

export const defaultState: CalcState = {
  type: "1 этаж",
  distance: "до 30 км",
  area: 150,
  foundation: "Монолитная плита",
  basement: false,
  wall: "Газобетон",
  slab: "Монолитные плиты перекрытия",
  roof: "Мягкая черепица",
  roofInsulation: "Без утепления",
  facadeInsulation: "Без утепления",
  facade: "Облицовочный кирпич",
  windows: "ПВХ-окна",
  stairs: "Не требуется",
  engineering: "Стандарт",
  finish: "Без отделки",
}
