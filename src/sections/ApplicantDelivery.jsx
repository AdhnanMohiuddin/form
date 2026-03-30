import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { formConfig } from "../constants/formConfig";
import { validateCrNumber } from "../services/crValidation";
import { STEPS } from "../constants/steps";
import { initialValues } from "../constants/initialValues";
import FormField from "../components/FormField";
import StepHeader from "../components/StepHeader";
import StepButtons from "../components/StepButtons";

const STEP = STEPS.APPLICANT_DELIVERY;
const SECTION_KEY = "ApplicantAndDeliveryDetails";
const PREFIX = `${SECTION_KEY}.delivery_details`;
const ALT_PREFIX = `${SECTION_KEY}.alternate_address.details`;

export default function ApplicantDelivery({ formik, currentStep, setCurrentStep }) {
  const [crValidationError, setCrValidationError] = useState("");
  const values = formik.values[SECTION_KEY];

  const handleCrNumberChange = (e) => {
    formik.handleChange(e);
    setCrValidationError("");
    formik.setFieldValue(`${SECTION_KEY}.applicant_details.is_cr_validated`, false);

    // Clear the is_cr_validated error and touched when user starts typing
    formik.setFieldTouched(`${SECTION_KEY}.applicant_details.is_cr_validated`, false);
    if (formik.errors[SECTION_KEY]?.applicant_details?.is_cr_validated) {
      const newErrors = { ...formik.errors };
      if (newErrors[SECTION_KEY]?.applicant_details) {
        delete newErrors[SECTION_KEY].applicant_details.is_cr_validated;
      }
      formik.setErrors(newErrors);
    }
  };

  const handleCrValidate = () => {
    const { valid, error } = validateCrNumber(values.applicant_details.cr_number);

    if (error) {
      setCrValidationError(error);
    } else {
      setCrValidationError("");
    }

    formik.setFieldValue(`${SECTION_KEY}.applicant_details.is_cr_validated`, valid);
  };

  const handleClear = () => {
    formik.setFieldValue(SECTION_KEY, { ...initialValues[SECTION_KEY] });
    formik.setErrors({});
    formik.setTouched({});
    setCrValidationError("");
  };

  const handleNext = async () => {
    // Set touched immediately for all fields to show errors
    const touchedObj = {
      [SECTION_KEY]: {
        applicant_details: { name: true, cr_number: true, is_cr_validated: true },
        delivery_details: {
          delivery_method: true, delivery_to: true, address_type: true,
          short_address: true, building_number: true, unit_number: true,
          street_name: true, secondary_number: true, district: true,
          city: true, country: true, postal_code: true,
        },
        alternate_address: { is_different: true },
      },
    };

    if (values.alternate_address.is_different) {
      touchedObj[SECTION_KEY].alternate_address.details = {
        recipient_name: true, building_number: true, street_name: true,
        district: true, city: true, country: true, postal_code: true,
      };
    }

    formik.setTouched(touchedObj);

    // Run validation - this will include the is_cr_validated check
    const errors = await formik.validateForm();

    if (!errors[SECTION_KEY]) {
      setCurrentStep(STEP + 1);
    } else {
      // Scroll to first error field
      setTimeout(() => {
        const crField = document.querySelector(`[name="${SECTION_KEY}.applicant_details.cr_number"]`);
        if (crField) {
          crField.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
    }
  };

  const toggleAlternateAddress = () => {
    const newValue = !values.alternate_address.is_different;
    formik.setFieldValue(`${SECTION_KEY}.alternate_address.is_different`, newValue);
    if (!newValue) {
      formik.setFieldValue(`${SECTION_KEY}.alternate_address.details`, {
        ...initialValues[SECTION_KEY].alternate_address.details,
      });
    }
  };

  return (
    <div className="max-w-full mx-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <StepHeader
        stepIndex={STEP}
        currentStep={currentStep}
        title="Applicant & Delivery details"
        onEdit={setCurrentStep}
      />

      {currentStep === STEP && (
        <div className="px-6 py-6 pr-40 space-y-6">
          {/* Applicant Details */}
          <div className="grid grid-cols-3 gap-6 items-start">
            <div>
              <h3 className="font-semibold text-gray-700">Applicant details</h3>
              <p className="text-sm text-gray-400">
                Enter CR Number to validate company and letter request
              </p>
            </div>

            <div className="space-y-4 col-span-2">
              <FormField name={`${SECTION_KEY}.applicant_details.name`} placeholder="Name" />

              {/* CR Number with inline Validate button */}
              <div>
                <div className="relative">
                  <Field
                    name={`${SECTION_KEY}.applicant_details.cr_number`}
                    placeholder="CR Number"
                    className="border border-gray-300 rounded px-3 py-2 pr-20 w-full text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                    onChange={handleCrNumberChange}
                  />
                  {!values.applicant_details.is_cr_validated ? (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium"
                      onClick={handleCrValidate}
                    >
                      Validate
                    </button>
                  ) : (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">
                      ✓
                    </span>
                  )}
                </div>
                {/* Hidden field to track is_cr_validated for Formik validation */}
                <Field
                  name={`${SECTION_KEY}.applicant_details.is_cr_validated`}
                  type="hidden"
                />
                {crValidationError && (
                  <div className="text-red-500 text-sm mt-1">{crValidationError}</div>
                )}
                <ErrorMessage
                  name={`${SECTION_KEY}.applicant_details.is_cr_validated`}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="grid grid-cols-3 gap-6 items-start mt-6">
            <h3 className="font-semibold text-gray-700">Applicant & delivery address</h3>

            <div className="space-y-4 col-span-2">
              <FormField
                name={`${PREFIX}.delivery_method`}
                as="select"
                placeholder="Select delivery method"
                options={formConfig.delivery_method_options}
              />
              <FormField
                name={`${PREFIX}.delivery_to`}
                as="select"
                placeholder="Select delivery to"
                options={formConfig.delivery_to_options}
              />
              <FormField
                name={`${PREFIX}.address_type`}
                as="select"
                placeholder="Select address type"
                options={formConfig.address_type_options}
              />
              <FormField name={`${PREFIX}.short_address`} placeholder="Short address" />

              <div className="grid grid-cols-2 gap-4">
                <FormField name={`${PREFIX}.building_number`} placeholder="Building number" />
                <FormField name={`${PREFIX}.unit_number`} placeholder="Unit number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField name={`${PREFIX}.street_name`} placeholder="Street name" />
                <FormField name={`${PREFIX}.secondary_number`} placeholder="Secondary number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name={`${PREFIX}.country`}
                  as="select"
                  placeholder="Select country"
                  options={formConfig.country_options}
                />
                <FormField name={`${PREFIX}.district`} placeholder="District" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField name={`${PREFIX}.city`} placeholder="City" />
                <FormField name={`${PREFIX}.postal_code`} placeholder="Postal code" />
              </div>

              <button
                type="button"
                className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer"
                onClick={toggleAlternateAddress}
              >
                {values.alternate_address.is_different
                  ? "Applicant address is same as above?"
                  : "Applicant address is Different?"}
              </button>
            </div>
          </div>

          {/* Alternate Address */}
          {values.alternate_address.is_different && (
            <div className="grid grid-cols-3 gap-6 items-start mt-6">
              <div>
                <h3 className="font-semibold text-gray-700">Applicant Address</h3>
                <p className="text-sm text-gray-400">
                  Enter Applicant delivery address details
                </p>
              </div>

              <div className="space-y-4 col-span-2">
                <FormField name={`${ALT_PREFIX}.recipient_name`} placeholder="Recipient Name" />
                <div className="grid grid-cols-2 gap-4">
                  <FormField name={`${ALT_PREFIX}.building_number`} placeholder="Building Number" />
                  <FormField name={`${ALT_PREFIX}.street_name`} placeholder="Street Name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField name={`${ALT_PREFIX}.district`} placeholder="District" />
                  <FormField name={`${ALT_PREFIX}.city`} placeholder="City" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField name={`${ALT_PREFIX}.country`} placeholder="Country" />
                  <FormField name={`${ALT_PREFIX}.postal_code`} placeholder="Postal Code" />
                </div>
              </div>
            </div>
          )}

          <StepButtons onClear={handleClear} onNext={handleNext} />
        </div>
      )}
    </div>
  );
}
