import { useMemo, useState } from "react";

import { buildMailBody, buildMailtoLink, formatDate } from "@shared/lib";
import {
  CheckboxField,
  DateField,
  HelpPopover,
  NumberField,
  SelectField,
  TextField,
  ThemeToggle,
} from "@shared/ui";
import { DELIVERY_METHODS, HINTS, PROJECT_TYPES } from "@shared/constants";
import { MarginOptions, useInitialCostUI, useMargin } from "@features/margin";
import { useFormHandlers, type FormState } from "./model";
import { mapFormToMailData } from "./lib";

export function ProjectPage() {
  const [formData, setFormData] = useState<FormState>({
    manager_name: "",
    number_of_our_project: "",
    customer: "",
    name_of_project: "",
    type: "",
    po_number: "",
    customer_project_number: "",
    contact_person: "",
    delivery_date: "",
    sales_price: "",
    initial_cost: "",
    delivery_method: "",
    delivery_by_nmh: false,
  });

  const {
    mode,
    customPercent,
    autoInitialCost,
    toggleFixed8,
    toggleCustom,
    onCustomChange,
    onCustomBlur,
    customInputRef,
  } = useMargin(formData.sales_price);

  const { initialCostValue, readOnly, setFreeEdited } = useInitialCostUI(
    mode,
    formData.sales_price,
    formData.initial_cost,
    autoInitialCost
  );

  const { handleFieldChange, handleCheckboxChange } = useFormHandlers(
    mode,
    setFormData,
    setFreeEdited
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const mailData = mapFormToMailData(formData, mode, autoInitialCost);
    if (!mailData) return;

    const body = buildMailBody(mailData, formatDate(formData.delivery_date));
    const subject = `New project ${formData.number_of_our_project}`;
    const mailto = buildMailtoLink("finance@nmh-sro.com", subject, body);
    window.location.href = mailto;
  };

  const canSubmit = useMemo(
    () => Boolean(mapFormToMailData(formData, mode, autoInitialCost)),
    [formData, mode, autoInitialCost]
  );

  return (
    <div
      className="
        font-manrope text-sm font-medium lg:text-base
        text-gray-900 dark:text-white
        bg-blue-50 dark:bg-gray-800
        min-w-sm min-h-screen p-6
        bg-[url('/icons/watermark.svg')] bg-no-repeat bg-center bg-fixed bg-size-[80vw]
        relative
      "
    >
      <h1 className="font-bold text-2xl text-center mb-4">
        Template of project
      </h1>
      <form
        className="flex flex-col gap-2 w-full max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <TextField
          id=" manager_name"
          name="manager_name"
          label="Manager name*:"
          value={formData.manager_name}
          onChange={handleFieldChange}
          helpText={HINTS.manager_name}
        />

        <TextField
          id="number_of_our_project"
          name="number_of_our_project"
          label="Number of our project*:"
          value={formData.number_of_our_project}
          onChange={handleFieldChange}
          helpText={HINTS.number_of_our_project}
        />

        <TextField
          id="customer"
          name="customer"
          label="Customer*:"
          value={formData.customer}
          onChange={handleFieldChange}
          helpText={HINTS.customer}
        />

        <TextField
          id="name_of_project"
          name="name_of_project"
          label="Name of Project*:"
          value={formData.name_of_project}
          onChange={handleFieldChange}
          helpText={HINTS.name_of_project}
        />
        <SelectField
          id="type"
          label="Type*:"
          options={[...PROJECT_TYPES]}
          value={formData.type}
          onChange={(val: string) => setFormData((p) => ({ ...p, type: val }))}
          placeholder="Select type"
          helpText={HINTS.type}
        />

        <TextField
          id="po_number"
          name="po_number"
          label="PO Number*:"
          value={formData.po_number}
          onChange={handleFieldChange}
          helpText={HINTS.po_number}
        />

        <TextField
          id="customer_project_number"
          name="customer_project_number"
          label="Customer project number*:"
          value={formData.customer_project_number}
          onChange={handleFieldChange}
          helpText={HINTS.customer_project_number}
        />

        <TextField
          id="contact_person"
          name="contact_person"
          label="Contact Person*:"
          value={formData.contact_person}
          onChange={handleFieldChange}
          helpText={HINTS.contact_person}
        />

        <DateField
          id="delivery_date"
          name="delivery_date"
          label="Delivery Date*:"
          value={formData.delivery_date}
          onChange={handleFieldChange}
          helpText={HINTS.delivery_date}
        />

        <NumberField
          id="sales_price"
          name="sales_price"
          label="Sales price*:"
          value={formData.sales_price}
          onChange={handleFieldChange}
          helpText={HINTS.sales_price}
        />

        <NumberField
          id="initial_cost"
          name="initial_cost"
          label="Initial cost*:"
          value={initialCostValue}
          onChange={handleFieldChange}
          readOnly={readOnly}
          helpText={HINTS.initial_cost}
        />

        <MarginOptions
          mode={mode}
          label="Margin options:"
          customPercent={customPercent}
          onToggleFixed8={toggleFixed8}
          onToggleCustom={toggleCustom}
          onCustomChange={onCustomChange}
          onCustomBlur={onCustomBlur}
          customInputRef={customInputRef}
          helpText={HINTS.margin_options}
        />

        <SelectField
          id="delivery_method"
          label="Delivery Method*:"
          options={[...DELIVERY_METHODS]}
          value={formData.delivery_method}
          onChange={(val: string) =>
            setFormData((p) => ({ ...p, delivery_method: val }))
          }
          placeholder="Select method"
          side="top"
          helpText={HINTS.delivery_method}
        />

        <div className="flex items-center gap-3">
          <CheckboxField
            id="delivery_by_nmh"
            name="delivery_by_nmh"
            label="Delivery by NMH"
            checked={formData.delivery_by_nmh}
            onChange={handleCheckboxChange}
          />
          <HelpPopover helpText={HINTS.delivery_by_nmh} />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="
            w-full p-2 rounded-lg font-bold
            bg-indigo-500 text-white
            not-disabled:hover:bg-indigo-600
            not-disabled:cursor-pointer
            disabled:opacity-30
            transition-all duration-100 ease-in
          "
        >
          Send project
        </button>
      </form>
      <ThemeToggle />
    </div>
  );
}
