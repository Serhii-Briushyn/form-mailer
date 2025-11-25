import type { MailData } from "@shared/types";

export function buildMailBody(data: MailData, formattedDate: string): string {
  const lines = [
    "Dobry den,",
    "",
    "Prosim zalozit novy projekt.",
    "",
    `Manager name: ${data.manager_name}`,
    `Number of our project: ${data.number_of_our_project}`,
    `Customer: ${data.customer}`,
    `Name of project: ${data.name_of_project} - ${data.type}`,
    `PO number: ${data.po_number}`,
    `Customer project number: ${data.customer_project_number}`,
    `Contact person: ${data.contact_person}`,
    `Delivery date: ${formattedDate}`,
    `Sales price: ${Number(data.sales_price).toFixed(2)}`,
    `Initial cost: ${Number(data.initial_cost).toFixed(2)}`,
    `Delivery method: ${data.delivery_method}`,
    `Delivery by NMH: ${data.delivery_by_nmh ? "YES" : "NO"}`,
    "",
    "Dakujem",
  ];
  return lines.join("\r\n");
}

export function buildMailtoLink(
  to: string,
  subject: string,
  body: string
): string {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${to}?subject=${s}&body=${b}`;
}
