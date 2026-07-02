const CONFIG = {
  // Apps-Script-Web-App-URL für die Speicherung der Antworten in Google Drive / Google Sheets.
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbzS-1yge9Y9avzWwKnNRq9jRTyqxJcPr27FygMNtzZrDB16mXF8XGvkv9prY64s-yUt/exec"
};

const params = new URLSearchParams(window.location.search);
const initialSegment = params.get("segment") && SEGMENTS[params.get("segment")]
  ? params.get("segment")
  : "recruiting";

const state = {
  segment: initialSegment,
  contactId: params.get("contact_id") || "",
  firma: params.get("firma") || "",
  campaign: params.get("campaign") || "",
  source: params.get("source") || ""
};

const form = document.querySelector("#questionnaireForm");
const sectionsRoot = document.querySelector("#sections");
const segmentTitle = document.querySelector("#segmentTitle");
const segmentKicker = document.querySelector("#segmentKicker");
const segmentStrip = document.querySelector("#segmentStrip");
const completionLabel = document.querySelector("#completionLabel");
const completionMeter = document.querySelector("#completionMeter");
const previewButton = document.querySelector("#previewButton");
const previewDialog = document.querySelector("#previewDialog");
const closePreview = document.querySelector("#closePreview");
const payloadPreview = document.querySelector("#payloadPreview");

function activeSegmentDefinition() {
  return SEGMENTS[state.segment];
}
function visibleSections() {
  return activeSegmentDefinition().sections.map((key) => FIELD_LIBRARY[key]);
}
function allFields() {
  return visibleSections().flatMap((section) => section.fields);
}
function fieldId(field) { return `field_${field.key}`; }
function fieldHasValue(field, element) { return Boolean(String(element?.value || "").trim()); }

function setActiveTab() {
  document.querySelectorAll(".segment-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.segment === state.segment);
  });
}

function applyUrlDefaults() {
  const companyField = form.elements["unternehmen"];
  if (companyField && state.firma && !companyField.value) {
    companyField.value = state.firma;
  }
}

function renderForm() {
  setActiveTab();
  const current = activeSegmentDefinition();
  segmentTitle.textContent = current.title;
  segmentKicker.textContent = current.kicker;
  segmentStrip.innerHTML = current.features.map(([title, text]) => `
    <div class="feature-tile"><strong>${title}</strong><span>${text}</span></div>
  `).join("");
  sectionsRoot.innerHTML = visibleSections().map((section, index) => `
    <section class="form-section">
      <div class="section-head">
        <div><h2>${section.title}</h2><p>${section.note}</p></div>
        <span class="section-count">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="fields-grid">${section.fields.map(renderField).join("")}</div>
    </section>
  `).join("");
  applyUrlDefaults();
  updateCompletion();
}

function renderField(field) {
  const required = field.required ? '<span class="required">*</span>' : "";
  const help = field.help ? `<small>${field.help}</small>` : "";
  const full = field.full || field.type === "textarea" ? " full" : "";
  let control = "";
  if (field.type === "select") {
    control = `<select id="${fieldId(field)}" name="${field.key}" ${field.required ? "required" : ""}>
      <option value="">Bitte auswählen</option>
      ${field.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
    </select>`;
  } else if (field.type === "textarea") {
    control = `<textarea id="${fieldId(field)}" name="${field.key}" ${field.required ? "required" : ""}></textarea>`;
  } else {
    control = `<input id="${fieldId(field)}" name="${field.key}" type="${field.type || "text"}" ${field.required ? "required" : ""}>`;
  }
  return `<div class="field${full}" data-field="${field.key}">
    <div class="field-meta"><label for="${fieldId(field)}">${field.label} ${required}</label>${help}</div>
    ${control}<span class="error-message">Bitte ausfüllen.</span>
  </div>`;
}

function collectPayload() {
  const definition = activeSegmentDefinition();
  const payload = {
    formular_version: "DACH-MF-2026-03",
    segment: state.segment,
    segment_label: definition.title,
    contact_id: state.contactId,
    firma_url: state.firma,
    campaign: state.campaign,
    source: state.source,
    submitted_at_client: new Date().toISOString()
  };
  for (const field of allFields()) {
    const element = form.elements[field.key];
    if (!element) continue;
    const value = String(element.value || "").trim();
    if (value) payload[field.key] = value;
  }
  return payload;
}

function validateForm() {
  let valid = true;
  for (const field of allFields()) {
    const wrapper = document.querySelector(`[data-field="${field.key}"]`);
    const element = form.elements[field.key];
    if (!wrapper || !element) continue;
    const empty = field.required && !fieldHasValue(field, element);
    wrapper.classList.toggle("has-error", empty);
    if (empty) valid = false;
  }
  updateCompletion();
  return valid;
}

function updateCompletion() {
  const fields = allFields().filter((field) => field.required);
  const done = fields.filter((field) => fieldHasValue(field, form.elements[field.key])).length;
  const percent = fields.length ? Math.round((done / fields.length) * 100) : 0;
  completionLabel.textContent = `${percent} Prozent vollständig`;
  completionMeter.style.width = `${percent}%`;
}

async function submitPayload(payload) {
  if (window.google && google.script && google.script.run) {
    return new Promise((resolve, reject) => {
      google.script.run.withSuccessHandler(resolve).withFailureHandler(reject).submitSurvey(payload);
    });
  }
  if (!CONFIG.WEB_APP_URL) {
    throw new Error("Keine Web-App-URL konfiguriert. Bitte Google Apps Script Web-App nutzen oder CONFIG.WEB_APP_URL setzen.");
  }
  await fetch(CONFIG.WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  return { ok: true, mode: "no-cors" };
}

document.querySelectorAll(".segment-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.segment = button.dataset.segment;
    form.reset();
    renderForm();
    const url = new URL(window.location.href);
    url.searchParams.set("segment", state.segment);
    window.history.replaceState(null, "", url.toString());
  });
});

form.addEventListener("input", updateCompletion);
form.addEventListener("change", updateCompletion);

previewButton.addEventListener("click", () => {
  validateForm();
  payloadPreview.textContent = JSON.stringify(collectPayload(), null, 2);
  previewDialog.showModal();
});
closePreview.addEventListener("click", () => previewDialog.close());

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  const submitButton = form.querySelector(".primary-button");
  submitButton.disabled = true;
  submitButton.textContent = "Wird gesendet";
  try {
    await submitPayload(collectPayload());
    submitButton.textContent = "Gesendet";
    submitButton.classList.add("is-success");
    alert("Vielen Dank. Ihre Antwort wurde erfolgreich gespeichert.");
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Fragebogen absenden";
    alert(`Senden fehlgeschlagen: ${error.message}`);
  }
});

renderForm();
