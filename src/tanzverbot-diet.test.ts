import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male)).toBeGreaterThan(0);
});


test("Tanzverbot Diet: 74kg → 100kg, 186cm, 38y, männlich", () => {
  const days = calcDateOnDiet(74, 100, 1.86, 38, Sex.Male);
  expect(days).toBe(64); // exakter Wert nach Berechnung
});
