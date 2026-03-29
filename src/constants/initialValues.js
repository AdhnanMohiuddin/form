export const initialValues = {

  BankAndLetterOfGuaranteeDetails: {
    bank_name: "",
    branch_name: "",
    guarantee_type: "",
    guarantee_amount: "",
    currency: "SAR",
    issue_date: "",
    expiry_date: "",
    purpose: ""
  },

  ApplicantAndDeliveryDetails: {
    applicant_details: {
      name: "",
      cr_number: "",
      is_cr_validated: false
    },

    delivery_details: {
      delivery_method: "",
      delivery_to: "",
      address_type: "",
      short_address: "",
      building_number: "",
      unit_number: "",
      street_name: "",
      secondary_number: "",
      district: "",
      city: "",
      country: "",
      postal_code: ""
    },

    alternate_address: {
      is_different: false,
      details: {
        recipient_name: "",
        building_number: "",
        street_name: "",
        district: "",
        city: "",
        country: "",
        postal_code: ""
      }
    }
  },

  BeneficiaryAndLiabilityDetails: {
    beneficiary_name: "",
    beneficiary_cr_number: "",
    beneficiary_address: "",
    liability_percentage: 100,
    claim_period_days: "",
    terms_conditions: ""
  },

  TotalOrderAmountDetails: {
    contract_amount: "",
    vat_percentage: 15,
    vat_amount: "",
    total_amount_including_vat: "",
    advance_payment_amount: "",
    final_payable_amount: "",
    currency: "SAR"
  }
};