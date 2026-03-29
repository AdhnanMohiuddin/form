import * as Yup from "yup";

export const applicantDeliverySchema = Yup.object({
  ApplicantAndDeliveryDetails: Yup.object({

    applicant_details: Yup.object({
      name: Yup.string().required("Applicant name is required"),

cr_number: Yup.string()
  .matches(/^\d+$/, "CR must be numeric")
  .length(10, "Invalid CR number")
  .required("CR Number is required"),
is_cr_validated: Yup.boolean(),
    }),

    delivery_details: Yup.object({
      delivery_method: Yup.string()
        .oneOf(["original", "electronic"])
        .required("Delivery method required"),

      delivery_to: Yup.string()
        .oneOf(["applicant", "beneficiary", "other"])
        .required("Delivery recipient required"),

      address_type: Yup.string()
        .oneOf(["national", "manual"])
        .required("Address type required"),

      short_address: Yup.string().when("address_type", {
        is: "national",
        then: (schema) => schema.required("Short address required")
      }),

      building_number: Yup.string().required("Building number required"),
      unit_number: Yup.string().nullable(),

      street_name: Yup.string().required("Street required"),
      secondary_number: Yup.string().nullable(),

      district: Yup.string().required("District required"),
      city: Yup.string().required("City required"),
      country: Yup.string().required("Country required"),

      postal_code: Yup.string()
        .matches(/^\d{6}$/, "postal code Must be 6 digits")
        .required("Postal code required")
    }),

    alternate_address: Yup.object({
      is_different: Yup.boolean(),

      details: Yup.object().when("is_different", {
        is: true,
        then: () =>
          Yup.object({
            recipient_name: Yup.string().required("recipient name required"),
            building_number: Yup.string().required("Building number required"),
            street_name: Yup.string().required(" Street name required"),
            district: Yup.string().required(" District name required"),
            city: Yup.string().required(" City name required"),
            country: Yup.string().required(" Country name required"),
            postal_code: Yup.string().required(" Postal code required")
          }),
        otherwise: () => Yup.object().nullable()
      })
    })

  })
});