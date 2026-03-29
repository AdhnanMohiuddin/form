import { Field, ErrorMessage } from "formik";
import { formConfig } from "../constants/formConfig";
import { Check } from "lucide-react";


export default function ApplicantDelivery({
  formik,
  currentStep,
  setCurrentStep,
}) {
  const isCompleted = currentStep > 1;
  const values = formik.values.ApplicantAndDeliveryDetails;

  // Handler for CR Number change
  const handleCrNumberChange = (e) => {
    formik.handleChange(e);
    // Reset tick when user edits
    formik.setFieldValue(
      "ApplicantAndDeliveryDetails.applicant_details.is_cr_validated",
      false
    );
  };

  // Valid CR numbers for testing (since no database access)
  const validCrNumbers = ["1234567890", "0987654321", "1111111111", "2222222222" , "1231231231"];

  // Explicit local CR validation (ensures immediate state updates without needing two clicks)
  const handleCrValidate = () => {
    const fieldName = "ApplicantAndDeliveryDetails.applicant_details.cr_number";
    const value = formik.values.ApplicantAndDeliveryDetails.applicant_details.cr_number?.trim() || "";

    let error = "";
    if (!value) {
      error = "CR Number is required";
    } else if (!/^[0-9]+$/.test(value)) {
      error = "CR must be numeric";
    } else if (value.length !== 10) {
      error = "Invalid CR number";
    } else if (!validCrNumbers.includes(value)) {
      error = "Invalid CR number";
    }

    formik.setFieldTouched(fieldName, true);
    formik.setFieldError(fieldName, error);

    // Keep tick synced
    formik.setFieldValue(
      "ApplicantAndDeliveryDetails.applicant_details.is_cr_validated",
      !error
    );
  };

  return (
    <div className="max-w-full mx-auto border rounded-xl bg-white shadow-sm mb-6">
      {/* HEADER */}
      <div className={`flex justify-between items-center p-4 ${currentStep === 1 ? 'border-b' : ''}`}>
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            {isCompleted ? (
    <Check className="text-white w-5 h-5 stroke-[4] " />
  ) : (
    "2"
  )}
          </div>

          <h2 className="font-semibold text-lg">
            Applicant & Delivery details
          </h2>
        </div>

        {isCompleted && (
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}
      </div>

      {/* ACTIVE */}
      {currentStep === 1 && (
        <div
          className="p-6 space-y-6 pr-25"
          onFocus={(e) => {
            const name = e.target.name;
            if (name) {
              formik.setFieldError(name, undefined);
              formik.setFieldTouched(name, false);
            }
          }}
        >
          {/* Applicant */}
          <div className="grid grid-cols-3 gap-6 items-start">
            {/* LEFT SIDE LABEL */}
            <div>
              <h3 className="font-semibold text-gray-700">Applicant details</h3>
              <p className="text-sm text-gray-400">
                Enter CR Number to validate company and letter request
              </p>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="space-y-4 col-span-2">
              <Field
                name="ApplicantAndDeliveryDetails.applicant_details.name"
                placeholder="Name"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="ApplicantAndDeliveryDetails.applicant_details.name"
                component="div"
                className="text-red-500 text-sm"
              />

<div className="w-full">
  <div className="relative">
    <Field
      name="ApplicantAndDeliveryDetails.applicant_details.cr_number"
      placeholder="CR Number"
      className="border p-2 pr-16 w-full rounded"
      onChange={handleCrNumberChange}
    />

    {/* Validate Button */}
    {!formik.values.ApplicantAndDeliveryDetails.applicant_details.is_cr_validated && (
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 text-sm"
        onClick={handleCrValidate}
      >
        Validate
      </button>
    )}

    {/* Tick Mark */}
    {formik.values.ApplicantAndDeliveryDetails.applicant_details.is_cr_validated && (
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 text-lg">
        ✓
      </span>
    )}
  </div>

  {/* Error Message */}
  <ErrorMessage
    name="ApplicantAndDeliveryDetails.applicant_details.cr_number"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>
            </div>
          </div>

          {/* Delivery */}
          <div className="grid grid-cols-3 gap-6 items-start mt-6">
            <h3 className="font-semibold text-gray-700">
              Applicant & delivery address
            </h3>

            <div className="space-y-4 col-span-2">
              {/* Selects */}
              <div className="space-y-4 gap-4">
                <Field
                  as="select"
                  name="ApplicantAndDeliveryDetails.delivery_details.delivery_method"
                  className="border p-2 rounded w-full"
                >

                  <option value="">Delivery of Original Guarantee</option>
                  {formConfig.delivery_method_options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Field>
                                    <ErrorMessage
    name="ApplicantAndDeliveryDetails.delivery_details.delivery_method"
    component="div"
    className="text-red-500 text-sm mt-1"
  />

                <Field
                  as="select"
                  name="ApplicantAndDeliveryDetails.delivery_details.delivery_to"
                  className="border p-2 rounded w-full"
                >
                  <option value="">Delivery to</option>
                  {formConfig.delivery_to_options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Field>
                                                    <ErrorMessage
    name="ApplicantAndDeliveryDetails.delivery_details.delivery_to"
    component="div"
    className="text-red-500 text-sm mt-1"
  />

                <Field
                  as="select"
                  name="ApplicantAndDeliveryDetails.delivery_details.address_type"
                  className="border p-2 rounded w-full col-span-2"
                >
                  <option value="">Address type</option>
                  {formConfig.address_type_options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Field>
                            <ErrorMessage
    name="ApplicantAndDeliveryDetails.delivery_details.address_type"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
              </div>

              {/* Short Address */}
              <Field
                name="ApplicantAndDeliveryDetails.delivery_details.short_address"
                placeholder="Short address"
                className="border p-2 rounded w-full"
              />

                                                  <ErrorMessage
    name="ApplicantAndDeliveryDetails.delivery_details.short_address"
    component="div"
    className="text-red-500 text-sm mt-1"
  />

              {/* Building / Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.building_number"
                    placeholder="Building number"
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.building_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.unit_number"
                    placeholder="Unit number"
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.unit_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Street / Secondary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.street_name"
                    placeholder="Street name"
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.street_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.secondary_number"
                    placeholder="Secondary number"
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.secondary_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Country / District */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.country"
                    placeholder="Country"
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.district"
                    placeholder="District"
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.district"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* City / Postal */}
              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.city"
                    placeholder="City"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.city"
                    component="div"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Postal Code */}
                <div className="flex flex-col">
                  <Field
                    name="ApplicantAndDeliveryDetails.delivery_details.postal_code"
                    placeholder="Postal Code"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="ApplicantAndDeliveryDetails.delivery_details.postal_code"
                    component="div"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>
              </div>
              {/* Alternate Address Toggle */}
              <button
                type="button"
                className="text-blue-600 text-sm underline hover:text-blue-800 cursor-pointer"
                onClick={() => {
                  const newValue = !formik.values.ApplicantAndDeliveryDetails.alternate_address.is_different;
                  formik.setFieldValue(
                    "ApplicantAndDeliveryDetails.alternate_address.is_different",
                    newValue
                  );
                  if (!newValue) {
                    // Clear alternate address details when disabling
                    formik.setFieldValue("ApplicantAndDeliveryDetails.alternate_address.details", {
                      recipient_name: "",
                      building_number: "",
                      street_name: "",
                      district: "",
                      city: "",
                      country: "",
                      postal_code: ""
                    });
                  }
                }}
              >
                {formik.values.ApplicantAndDeliveryDetails.alternate_address.is_different
                  ? "Applicant address is same as above?"
                  : "Applicant address is Different?"}
              </button>
            </div>
          </div>

          {/* ALTERNATE ADDRESS */}
          {formik.values.ApplicantAndDeliveryDetails.alternate_address.is_different && (
            <div className="grid grid-cols-3 gap-6 items-start mt-6">
              <div>
                <h3 className="font-semibold text-gray-700">Applicant Address</h3>
                <p className="text-sm text-gray-400">
                  Enter Applicant delivery address details
                </p>
              </div>

              <div className="space-y-4 col-span-2">
                <Field
                  name="ApplicantAndDeliveryDetails.alternate_address.details.recipient_name"
                  placeholder="Recipient Name"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage
                  name="ApplicantAndDeliveryDetails.alternate_address.details.recipient_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Field
                      name="ApplicantAndDeliveryDetails.alternate_address.details.building_number"
                      placeholder="Building Number"
                      className="border p-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="ApplicantAndDeliveryDetails.alternate_address.details.building_number"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      name="ApplicantAndDeliveryDetails.alternate_address.details.street_name"
                      placeholder="Street Name"
                      className="border p-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="ApplicantAndDeliveryDetails.alternate_address.details.street_name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Field
                      name="ApplicantAndDeliveryDetails.alternate_address.details.district"
                      placeholder="District"
                      className="border p-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="ApplicantAndDeliveryDetails.alternate_address.details.district"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      name="ApplicantAndDeliveryDetails.alternate_address.details.city"
                      placeholder="City"
                      className="border p-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="ApplicantAndDeliveryDetails.alternate_address.details.city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Field
                      name="ApplicantAndDeliveryDetails.alternate_address.details.country"
                      placeholder="Country"
                      className="border p-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="ApplicantAndDeliveryDetails.alternate_address.details.country"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      name="ApplicantAndDeliveryDetails.alternate_address.details.postal_code"
                      placeholder="Postal Code"
                      className="border p-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="ApplicantAndDeliveryDetails.alternate_address.details.postal_code"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                formik.setFieldValue("ApplicantAndDeliveryDetails", {
                  applicant_details: {
                    name: "",
                    cr_number: "",
                    is_cr_validated: false,
                  },
                  delivery_details: {
                    short_address: "",
                    building_number: "",
                    unit_number: "",
                    street_name: "",
                    secondary_number: "",
                    district: "",
                    city: "",
                    country: "",
                    postal_code: "",
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
                  },
                });
                formik.setTouched({
                      ApplicantAndDeliveryDetails: {
                      applicant_details: {
                        name: false,
                        cr_number: false,
                      },
                      delivery_details: {
                        delivery_method: false,
                        delivery_to: false,
                        address_type: false,
                        short_address: false,
                        building_number: false,
                        unit_number: false,
                        street_name: false,
                        secondary_number: false,
                        district: false,
                        city: false,
                        country: false,
                        postal_code: false,
                      },
                      alternate_address: {
                        is_different: false,
                      },
                    },

                })
              }}
              className="border px-4 py-2 rounded"
            >
              Clear
            </button>

            <div className="flex gap-2">
              {/* 
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                Back
              </button>
              */}

              <button
                type="button"
                onClick={async () => {
                  const errors = await formik.validateForm();

                  // Mark all relevant fields as touched so errors display
                  const touchedObj = {
                    ApplicantAndDeliveryDetails: {
                      applicant_details: {
                        name: true,
                        cr_number: true,
                      },
                      delivery_details: {
                        delivery_method: true,
                        delivery_to: true,
                        address_type: true,
                        short_address: true,
                        building_number: true,
                        unit_number: true,
                        street_name: true,
                        secondary_number: true,
                        district: true,
                        city: true,
                        country: true,
                        postal_code: true,
                      },
                      alternate_address: {
                        is_different: true,
                      },
                    },
                  };

                  if (formik.values.ApplicantAndDeliveryDetails.alternate_address.is_different) {
                    touchedObj.ApplicantAndDeliveryDetails.alternate_address.details = {
                      recipient_name: true,
                      building_number: true,
                      street_name: true,
                      district: true,
                      city: true,
                      country: true,
                      postal_code: true,
                    };
                  }

                  formik.setTouched(touchedObj);

                  if (!errors.ApplicantAndDeliveryDetails) {
                    if (
                      formik.values.ApplicantAndDeliveryDetails.applicant_details
                        .is_cr_validated
                    ) {
                      if (currentStep < 3) {
                        setCurrentStep(currentStep + 1);
                      } else {
                        formik.handleSubmit();
                      }
                    } else {
                      formik.setFieldError(
                        "ApplicantAndDeliveryDetails.applicant_details.cr_number",
                        "Please validate CR number before proceeding"
                      );
                      const crErrorEl = document.querySelector('[name="ApplicantAndDeliveryDetails.applicant_details.cr_number"]');
                      if (crErrorEl) {
                        crErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  } else {
                    setTimeout(() => {
                      const firstErrorEl = document.querySelector('.text-red-500');
                      if (firstErrorEl && firstErrorEl.scrollIntoView) {
                        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }, 45);
                  }
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETED 
      {isCompleted && (
        <div className="p-4 text-sm text-gray-600">
          <p>
            <strong>Name:</strong> {values.applicant_details.name}
          </p>
          <p>
            <strong>CR:</strong> {values.applicant_details.cr_number}
          </p>
        </div>
      )}
        */}
    </div>
  );
}
