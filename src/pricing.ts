export const emptyInputs = {
  width: '', height: '', loss: '', framePrice: '', glassPrice: '',
  backingPrice: '', matPrice: '', fabricPrice: '', printPrice: '', service: '', percentage: '', quantity: '',
};

export type PricingInputs = typeof emptyInputs;

export function sanitizeNumber(value: string): string {
  const cleaned = value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
  const [integer, ...decimals] = cleaned.split('.');
  return decimals.length ? `${integer},${decimals.join('')}` : integer;
}

export function toNumber(value: string): number {
  const number = Number(value.replace(',', '.'));
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

export function toQuantity(value: string): number {
  const quantity = Math.floor(toNumber(value));
  return quantity > 0 ? quantity : 1;
}

// A perda aceita centímetros inteiros ou a forma abreviada em metros:
// 50, .50 e 0,50 representam 50 cm; 50,5 representa 50,5 cm.
export function lossInCentimeters(value: string): number {
  const normalized = value.replace(',', '.');
  const amount = toNumber(value);
  return /^(?:0)?\.\d+$/.test(normalized) ? amount * 100 : amount;
}

export function calculatePrice(inputs: PricingInputs) {
  const width = toNumber(inputs.width);
  const height = toNumber(inputs.height);
  const area = width * height / 10_000;
  const lossCm = lossInCentimeters(inputs.loss);
  const frameLengthCm = 2 * (width + height) + lossCm;
  const frameLengthMeters = frameLengthCm / 100;
  const items = {
    frame: frameLengthMeters * toNumber(inputs.framePrice),
    glass: area * toNumber(inputs.glassPrice),
    backing: area * toNumber(inputs.backingPrice),
    mat: area * toNumber(inputs.matPrice),
    fabric: area * toNumber(inputs.fabricPrice),
    print: area * toNumber(inputs.printPrice),
    service: toNumber(inputs.service),
  };
  const subtotal = Object.values(items).reduce((sum, value) => sum + value, 0);
  const surcharge = subtotal * toNumber(inputs.percentage) / 100;
  const unitTotal = subtotal + surcharge;
  const quantity = toQuantity(inputs.quantity);

  return { area, lossCm, frameLengthCm, frameLengthMeters, items, subtotal, surcharge, unitTotal, quantity, total: unitTotal * quantity };
}
