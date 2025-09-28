import { useState } from "react";
import "./App.css";

import Field from "./components/Field";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";
import MarginOptions from "./components/MarginOptions";

import { PROJECT_TYPES, DELIVERY_METHODS } from "./constants/selectOptions";
import { formatDate } from "./utils/dates";
import { buildMailBody, buildMailtoLink } from "./utils/mail";
import { toNumber } from "./utils/numbers";
import useMargin, { MARGIN_MODES } from "./hooks/useMargin";

function App() {
  const [formData, setFormData] = useState({
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
    setCustomPercent,
    autoInitialCost,
    toggleFixed8,
    toggleCustom,
  } = useMargin(formData.sales_price);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    if (name === "sales_price" || name === "initial_cost") {
      const normalized = value.replace(",", ".");
      if (normalized === "" || /^[0-9]*[.]?[0-9]*$/.test(normalized)) {
        setFormData((prev) => ({ ...prev, [name]: normalized }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sales = toNumber(formData.sales_price);
    if (Number.isNaN(sales) || sales < 0) {
      alert("Sales price must be a non-negative number.");
      return;
    }

    let initialCostStr = "";
    if (mode === MARGIN_MODES.NONE) {
      const raw =
        formData.initial_cost === ""
          ? formData.sales_price
          : formData.initial_cost;
      const init = toNumber(raw);
      if (Number.isNaN(init) || init < 0) {
        alert("Initial cost must be a non-negative number.");
        return;
      }
      initialCostStr = init.toFixed(2);
    } else {
      if (!autoInitialCost) {
        alert(
          "Unable to calculate Initial cost. Check Sales price and margin settings."
        );
        return;
      }
      initialCostStr = autoInitialCost;
    }

    const body = buildMailBody(
      { ...formData, initial_cost: initialCostStr, sales_price: sales },
      formatDate(formData.delivery_date)
    );
    const subject = `New project ${formData.number_of_our_project}`;
    const mailto = buildMailtoLink("finance@nmh-sro.com", subject, body);
    window.location.href = mailto;
  };

  const initialCostValue =
    mode === MARGIN_MODES.NONE
      ? formData.initial_cost !== ""
        ? formData.initial_cost
        : formData.sales_price
      : autoInitialCost;

  return (
    <>
      <div className="container">
        <h1 className="title">Template of project</h1>

        <form className="form" onSubmit={handleSubmit}>
          <Field id="manager_name" label="Manager name:">
            <input
              id="manager_name"
              className="input"
              name="manager_name"
              value={formData.manager_name}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="number_of_our_project" label="Number of our project:">
            <input
              id="number_of_our_project"
              className="input"
              name="number_of_our_project"
              value={formData.number_of_our_project}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="customer" label="Customer:">
            <input
              id="customer"
              className="input"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="name_of_project" label="Name of Project:">
            <input
              id="name_of_project"
              className="input"
              name="name_of_project"
              value={formData.name_of_project}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="type" label="Type:">
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={PROJECT_TYPES}
              placeholder="Select type"
              required
            />
          </Field>

          <Field id="po_number" label="PO Number:">
            <input
              id="po_number"
              className="input"
              name="po_number"
              value={formData.po_number}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="customer_project_number" label="Customer project number:">
            <input
              id="customer_project_number"
              className="input"
              name="customer_project_number"
              value={formData.customer_project_number}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="contact_person" label="Contact Person:">
            <input
              id="contact_person"
              className="input"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="delivery_date" label="Delivery Date:">
            <input
              id="delivery_date"
              type="date"
              className="input"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="sales_price" label="Sales price:">
            <input
              id="sales_price"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className="input"
              name="sales_price"
              value={formData.sales_price}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="initial_cost" label="Initial Cost:">
            <input
              id="initial_cost"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className="input"
              name="initial_cost"
              value={initialCostValue}
              onChange={handleChange}
              readOnly={mode !== MARGIN_MODES.NONE}
              aria-readonly={mode !== MARGIN_MODES.NONE}
              required
            />
          </Field>

          <MarginOptions
            mode={mode}
            customPercent={customPercent}
            setCustomPercent={setCustomPercent}
            onToggleFixed8={toggleFixed8}
            onToggleCustom={toggleCustom}
          />

          <Field id="delivery_method" label="Delivery Method:">
            <Select
              id="delivery_method"
              name="delivery_method"
              value={formData.delivery_method}
              onChange={handleChange}
              options={DELIVERY_METHODS}
              placeholder="Select type"
              required
            />
          </Field>

          <div className="inputBox">
            <Checkbox
              name="delivery_by_nmh"
              label="Delivery by NMH"
              checked={formData.delivery_by_nmh}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
