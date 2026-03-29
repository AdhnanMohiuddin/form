import * as Yup from "yup";

export const bankGuaranteeSchema = Yup.object({
  BankAndLetterOfGuaranteeDetails: Yup.object({
    bank_name: Yup.string()
      .min(3,"bank should be of more then two letters")
      .matches(/^[a-zA-Z]+$/, 'numbers, and underscores are not allowed')
      .required("Bank name is required"),

    branch_name: Yup.string()
    .min(3,"bank should be of more then two letters")
    .matches(/^[a-zA-Z]+$/, 'numbers, and underscores are not allowed')
    .required("Branch name is required"),

    guarantee_type: Yup.string()
      .required("Guarantee type is required"),

    guarantee_amount: Yup.number()
      .positive("Amount must be positive")
      .required("Guarantee amount is required"),

    currency: Yup.string().required("Currency is required"),

    issue_date: Yup.date().required("Issue date is required"),

    expiry_date: Yup.date()
      .min(Yup.ref("issue_date"), "Expiry must be after issue date")
      .required("Expiry date is required"),

    purpose: Yup.string().required("Purpose is required")
  })
});