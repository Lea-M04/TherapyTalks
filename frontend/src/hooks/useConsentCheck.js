// src/hooks/useConsentCheck.js
import { useState } from "react";
import { getTemplatesByProfessional, createConsent, getConsentByPatient } from "@/lib/consent";

/**
 * useConsentCheck
 * - professionalID: the professional of the chat
 * - patientID: the current patient (or null if not logged)
 */
export default function useConsentCheck() {
  const [loading, setLoading] = useState(false);

  async function fetchTemplateForProfessional(professionalID) {
    // backend returns all consents for professional; we pick template where patientID == null
    const all = await getTemplatesByProfessional(professionalID);
    // prefer explicit template (patientID null)
    const template = all.find(t => t.patientID === null || t.patientID === undefined) || all[0];
    return template || null;
  }

  // check if patient already has consent with this professional
  async function patientHasConsent(patientID, professionalID) {
    if (!patientID) return false;
    const patientConsents = await getConsentByPatient(patientID);
    return patientConsents.some(c => c.professionalID === professionalID && !c.isRevoked);
  }

  // accept: create new consent record copying template and set patientID
  async function acceptTemplate(template, patientID) {
    if (!template) throw new Error("No template to accept");
    const payload = {
      consentType: template.consentType,
      description: template.description,
      signedAt: new Date().toISOString(),
      isRevoked: false,
      revokedAt: null,
      patientID: Number(patientID),
      professionalID: template.professionalID,
    };
    const created = await createConsent(payload);
    return created;
  }

  return {
    fetchTemplateForProfessional,
    patientHasConsent,
    acceptTemplate,
    loading,
    setLoading,
  };
}
