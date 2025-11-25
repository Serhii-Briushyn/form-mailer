import { MARGIN_MODES } from "@features/margin";
import { toNumber } from "@shared/lib";

import type { MailData } from "@shared/types";

const nonEmpty = (s: string | undefined | null) =>
  typeof s === "string" && s.trim().length > 0;

export function mapFormToMailData(
  form: {
    manager_name: string;
    number_of_our_project: string;
    customer: string;
    name_of_project: string;
    type: string;
    po_number: string;
    customer_project_number: string;
    contact_person: string;
    delivery_date: string;
    sales_price: string;
    initial_cost: string;
    delivery_method: string;
    delivery_by_nmh: boolean;
  },
  mode: MARGIN_MODES,
  autoInitialCost?: string | null
): MailData | null {
  const requiredKeys = [
    "manager_name",
    "number_of_our_project",
    "customer",
    "name_of_project",
    "type",
    "po_number",
    "customer_project_number",
    "contact_person",
    "delivery_date",
    "sales_price",
    "delivery_method",
  ] as const;

  for (const key of requiredKeys) {
    if (!nonEmpty(form[key])) return null;
  }

  const sales = toNumber(form.sales_price);
  if (!Number.isFinite(sales) || sales < 0) return null;

  let initialCostStr = "";

  if (mode === MARGIN_MODES.NONE) {
    const raw = nonEmpty(form.initial_cost)
      ? form.initial_cost
      : form.sales_price;
    const init = toNumber(raw);
    if (!Number.isFinite(init) || init < 0) return null;
    initialCostStr = init.toFixed(2);
  } else {
    if (!nonEmpty(autoInitialCost)) return null;
    const init = toNumber(autoInitialCost as string);
    if (!Number.isFinite(init) || init < 0) return null;
    initialCostStr = init.toFixed(2);
  }

  const mailData: MailData = {
    ...form,
    sales_price: sales.toFixed(2),
    initial_cost: initialCostStr,
    delivery_date: form.delivery_date,
  };

  return mailData;
}
