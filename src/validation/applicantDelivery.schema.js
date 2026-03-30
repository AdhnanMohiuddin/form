import * as Yup from "yup";
import { formConfig } from "../constants/formConfig";

const deliveryMethodValues = formConfig.delivery_method_options.map((o) => o.value);
const deliveryToValues = formConfig.delivery_to_options.map((o) => o.value);
const addressTypeValues = formConfig.address_type_options.map((o) => o.value);

export const applicantDeliverySchema = Yup.object({
  ApplicantAndDeliveryDetails: Yup.object({
    applicant_details: Yup.object({
      name: Yup.string().required("Applicant name is required"),
      cr_number: Yup.string()
        .required("CR Number is required"),
      is_cr_validated: Yup.boolean().test(
        "cr-validated",
        "Please validate CR number before proceeding",
        (value) => value === true
      ),
    }),

    delivery_details: Yup.object({
      delivery_method: Yup.string()
        .oneOf(deliveryMethodValues, "Invalid delivery method")
        .required("Delivery method required"),

      delivery_to: Yup.string()
        .oneOf(deliveryToValues, "Invalid delivery recipient")
        .required("Delivery recipient required"),

      address_type: Yup.string()
        .oneOf(addressTypeValues, "Invalid address type")
        .required("Address type required"),

      short_address: Yup.string().when("address_type", {
        is: "national",
        then: (schema) => schema.required("Short address required"),
      }),

      building_number: Yup.string().required("Building number required"),
      unit_number: Yup.string().nullable(),

      street_name: Yup.string().required("Street required"),
      secondary_number: Yup.string().nullable(),

      district: Yup.string().required("District required"),
      city: Yup.string().required("City required"),
      country: Yup.string().required("Country required"),

      postal_code: Yup.string()
        .matches(/^\d{6}$/, "Postal code must be 6 digits")
        .required("Postal code required"),
    }),

    alternate_address: Yup.object({
      is_different: Yup.boolean(),

      details: Yup.object().when("is_different", {
        is: true,
        then: () =>
          Yup.object({
            recipient_name: Yup.string().required("Recipient name required"),
            building_number: Yup.string().required("Building number required"),
            street_name: Yup.string().required("Street name required"),
            district: Yup.string().required("District name required"),
            city: Yup.string().required("City name required"),
            country: Yup.string().required("Country name required"),
            postal_code: Yup.string().required("Postal code required"),
          }),
        otherwise: () => Yup.object().nullable(),
      }),
    }),
  }),
});
