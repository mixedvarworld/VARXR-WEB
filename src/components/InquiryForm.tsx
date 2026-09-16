import { FormEvent, useState } from "react";
import { api } from "../api";

export default function InquiryForm({ propertyId }: { propertyId: number }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("I am interested in this property.");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await api.createInquiry({
        propertyId,
        name,
        phone,
        email,
        message,
      });
      setStatus("Thank you. Your inquiry has been submitted.");
      setName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to submit inquiry.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="eyebrow">ENQUIRE NOW</div>
      <h3>Interested in this property?</h3>
      <label>
        Name
        <input required value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Phone
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
      </label>
      <button className="primary-btn" disabled={busy}>
        {busy ? "Sending…" : "Send inquiry"}
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}