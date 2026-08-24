export function eur(n) {
  return (Number.isFinite(n) ? n : 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export function totals(doc) {
  const ht = (doc.lines || []).reduce(
    (s, l) => s + (Number(l.qty) || 0) * (Number(l.price) || 0),
    0
  );
  const tva = ht * ((Number(doc.tva) || 0) / 100);
  return { ht, tva, ttc: ht + tva };
}

export function acompteAmount(doc, t) {
  if (!doc.acompte?.active) return 0;
  const v = Number(doc.acompte.value) || 0;
  return doc.acompte.mode === "percent" ? t.ttc * (v / 100) : v;
}
