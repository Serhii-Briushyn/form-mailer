export const PROJECT_TYPES = [
  "DE",
  "MA",
  "GD",
  "CC",
  "SP",
  "LCP",
  "LCS",
  "RI",
  "EC",
  "SH",
  "SE",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const DELIVERY_METHODS = [
  "EXW",
  "FCA",
  "CPT",
  "CIP",
  "DAP",
  "DDP",
  "DPU",
] as const;
export type DeliveryMethod = (typeof DELIVERY_METHODS)[number];

export const HINTS = {
  manager_name:
    'Zadať meno projektového manažéra v tvare "Krstné meno Priezvisko" bez diakritiky',
  number_of_our_project:
    "Zadať číslo projektu z objednávky / ďalšie číslo nášho projektu v tvare 2x810xxx / v prípade laser projektu 2x815xxx",
  customer: "Zadať meno zákazníka z objednávky",
  name_of_project:
    'Meno projektu zadať v tvare "CUSTOMER - Material/Service" Poznámka: CUSTOMER zadať všetko veľkými písmenami, názov materiálu a služby zadať v anglickom jazyku',
  type: "Vyber typ projektu",
  po_number:
    'Zadať číslo objednávky z objednávky zákazníka, v prípade emailovej objednávky zadať "email order"',
  customer_project_number:
    "Zadať číslo projektu zákazníka z objednávky / v prípade laser projektu zadať číslo materského projektu NMH / v prípade podprojektu zadať nadriadený projekt",
  contact_person: "Zadať kontaktnú osobu zákazníka z objednávky",
  delivery_date: "Zadať dátum dodania z objednávky",
  sales_price: "Zadať predajnú cenu z objednávky",
  initial_cost: "Zadať predpokladané náklady",
  margin_options: "Vyber maržu 8% / zadať vlastnú hodnotu",
  delivery_method: "Vyber dodacie podmienky z objednávky",
  delivery_by_nmh: "Ak prepravu platí NMH, vyber možnosť Delivery by NMH",
} as const;
