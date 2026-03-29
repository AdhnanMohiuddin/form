import * as Yup from "yup";

export const beneficiaryLiabilitySchema = Yup.object({
  BeneficiaryAndLiabilityDetails: Yup.object({
    beneficiary_name: Yup.string().required("Beneficiary name required"),


    beneficiary_address: Yup.string().required("Address required"),

    liability_percentage: Yup.number()
      .min(0, "Cannot be less than 0")
      .max(100, "Cannot exceed 100")
      .required("Liability % required"),

    claim_period_days: Yup.number()
      .positive("Must be positive")
      .required("Claim period required"),

    // terms_conditions: Yup.string().required("Terms required")
  })
});