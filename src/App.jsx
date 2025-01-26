import { useState } from "react";

import "./App.css";

function App() {
  const [discountChecked, setDiscountChecked] = useState(false);

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
  };

  const [formData, setFormData] = useState({
    manager_number: "",
    number: "",
    customer: "",
    name_of_project: "",
    type: "",
    po_number: "",
    customer_project_number: "",
    contact_person: "",
    delivery_date: "",
    amount: "",
    initial_cost: "",
    delivery_method: "",
    delivery_by_nmh: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageContent = `
      Dobry den,

      Prosim zalozit novy projekt.

      Manager number: ${formData.manager_number}
      Number: ${formData.number}
      Customer: ${formData.customer}
      Name of project: ${formData.name_of_project}
      Type: ${formData.type}
      PO number: ${formData.po_number}
      Customer project number: ${formData.customer_project_number}
      Contact person: ${formData.contact_person}
      Delivery date: ${formatDate(formData.delivery_date)}
      Amount: ${formData.amount}
      Initial cost: ${formData.initial_cost}
      Delivery method: ${formData.delivery_method}
      Delivery by NMH: ${formData.delivery_by_nmh ? "YES" : "NO"}

      Dakujem
    `;

    const mailtoLink = `mailto:finance@nmh-sro.com?subject=New project ${
      formData.number
    }&body=${encodeURIComponent(messageContent)}`;

    window.location.href = mailtoLink;
  };

  return (
    <>
      <img className="logo" src="/logo.png" alt="Logo" />
      <div className="container">
        <h1 className="title">Template of project</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputBox">
            <label className="label">Manager number:</label>
            <input
              type="text"
              name="manager_number"
              value={formData.manager_number}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Number:</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Customer:</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Name of Project:</label>
            <input
              type="text"
              name="name_of_project"
              value={formData.name_of_project}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select type</option>
              <option value="DE">DE</option>
              <option value="MA">MA</option>
              <option value="GD">GD</option>
              <option value="CC">CC</option>
              <option value="SP">SP</option>
              <option value="LCP">LCP</option>
              <option value="LCS">LCS</option>
              <option value="RI">RI</option>
              <option value="EC">EC</option>
              <option value="SH">SH</option>
              <option value="SE">SE</option>
            </select>
          </div>
          <div className="inputBox">
            <label className="label">PO Number:</label>
            <input
              type="text"
              name="po_number"
              value={formData.po_number}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Customer project number:</label>
            <input
              type="text"
              name="customer_project_number"
              value={formData.customer_project_number}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Contact Person:</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Delivery Date:</label>
            <input
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={(e) => {
                const { value } = e.target;
                setFormData((prevData) => ({
                  ...prevData,
                  amount: value,
                  initial_cost: discountChecked
                    ? (value * 0.92).toFixed(2)
                    : value,
                }));
              }}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">Initial Cost:</label>
            <input
              type="number"
              name="initial_cost"
              value={formData.initial_cost}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label className="label">
              <input
                type="checkbox"
                checked={discountChecked}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setDiscountChecked(isChecked);
                  setFormData((prevData) => ({
                    ...prevData,
                    initial_cost: isChecked
                      ? (prevData.amount * 0.92).toFixed(2)
                      : prevData.amount,
                  }));
                }}
                className="checkbox"
              />
              Apply 8% Discount
            </label>
          </div>

          <div className="inputBox">
            <label className="label">Delivery Method:</label>
            <select
              type="text"
              name="delivery_method"
              value={formData.delivery_method}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select type</option>
              <option value="EXW">EXW</option>
              <option value="FCA">FCA</option>
              <option value="CPT">CPT</option>
              <option value="CIP">CIP</option>
              <option value="DAP">DAP</option>
              <option value="DDP">DDP</option>
              <option value="DPU">DPU</option>
            </select>
          </div>
          <div className="inputBox">
            <label className="label">
              <input
                type="checkbox"
                checked={formData.delivery_by_nmh}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData((prevData) => ({
                    ...prevData,
                    delivery_by_nmh: isChecked,
                  }));
                }}
                className="checkbox"
              />
              Delivery by NMH
            </label>
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
