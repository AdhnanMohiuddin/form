import * as Yup from "yup";

export const totalOrderAmountSchema = Yup.object({
  TotalOrderAmountDetails: Yup.object({
    contract_amount: Yup.number()
      .positive("Must be positive")
      .required("Contract amount required"),

    vat_percentage: Yup.number()
      .min(0, "VAT % cannot be negative")
      .max(100, "VAT % should be less than 100")
      .required("VAT % required"),

    vat_amount: Yup.mixed().nullable(),

    total_amount_including_vat: Yup.mixed().nullable(),

    advance_payment_amount: Yup.number()
      .min(0, "Cannot be negative")
      .nullable(),

    final_payable_amount: Yup.mixed().nullable(),

    currency: Yup.string().required("Currency required")
  })
});
