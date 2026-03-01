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
  base *= c.typeMultipliers[s.type] ?? 1
  base += s.area * (c.wallAddonsPerM2[s.wall] ?? 0)
  base += s.area * (c.slabAddonsPerM2[s.slab] ?? 0)
  base += s.area * (c.roofAddonsPerM2[s.roof] ?? 0)
  base += s.area * (c.roofInsulationAddonsPerM2[s.roofInsulation] ?? 0)
  base += s.area * (c.facadeInsulationAddonsPerM2[s.facadeInsulation] ?? 0)
  base += s.area * (c.facadeAddonsPerM2[s.facade] ?? 0)
  base += s.area * (c.windowAddonsPerM2[s.windows] ?? 0)
  base += s.area * (c.engineeringPerM2[s.engineering] ?? 0)
  base += s.area * (c.finishPerM2[s.finish] ?? 0)
  base += c.foundationAddons[s.foundation] ?? 0
  base += c.stairsAddons[s.stairs] ?? 0
  if (s.basement) base += s.area * c.basementPerM2
  base += c.distanceAddons[s.distance] ?? 0
  const total = Math.round(base)
  return { total, perM2: Math.round(total / s.area) }
}

export function formatRub(n: number): string {
  return n.toLocaleString("ru-RU") + " ₽"
}

export const defaultState: CalcState = {
  type: "1 этаж + мансарда",
  distance: "до 30 км",
  area: 172,
  foundation: "Монолитная плита",
  basement: false,
  wall: "Газобетон + облицовочный кирпич",
  slab: "Железобетонные плиты",
  roof: "Металлочерепица",
  roofInsulation: "Без утепления",
  facadeInsulation: "Без утепления",
  facade: "Облицовочный кирпич",
  windows: "Металлопластиковые",
  stairs: "Деревянная",
  engineering: "Стандарт",
  finish: "Без отделки",
}
