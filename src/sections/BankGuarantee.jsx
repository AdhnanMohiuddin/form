import { Field, ErrorMessage } from "formik";
import { formConfig } from "../constants/formConfig";
import { Check } from "lucide-react";

export default function BankGuarantee({ formik, currentStep, setCurrentStep }) {
  const isCompleted = currentStep > 0;
  const values = formik.values.BankAndLetterOfGuaranteeDetails;

  return (
    <div className="max-w-full mx-auto border rounded-xl bg-white shadow-sm mb-6">

      {/* HEADER */}
      <div className={`flex justify-between items-center p-4 ${currentStep === 0 ? 'border-b' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200"}`}>
              {isCompleted ? (
    <Check className="text-white w-5 h-5 stroke-[4] " />
  ) : (
    "1"
  )}
          </div>
          <h2 className="font-semibold text-lg">Bank & Letter of Guarantee details</h2>
        </div>

        {isCompleted && (
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}
      </div>

      {/* ACTIVE FORM */}
      {currentStep === 0 && (
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

          {/* BANK DETAILS */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start">
            {/* LEFT SIDE LABEL */}
            <div>
              <h3 className="font-semibold text-gray-700">Bank Details</h3>
              <p className="text-sm text-gray-400">
                Enter bank information to process the guarantee
              </p>
            </div>

            {/* RIGHT SIDE INPUTS */}
            <div className="space-y-4 col-span-2">
              <Field
                name="BankAndLetterOfGuaranteeDetails.bank_name"
                placeholder="Bank Name"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="BankAndLetterOfGuaranteeDetails.bank_name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                name="BankAndLetterOfGuaranteeDetails.branch_name"
                placeholder="Branch Name"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="BankAndLetterOfGuaranteeDetails.branch_name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                as="select"
                name="BankAndLetterOfGuaranteeDetails.currency"
                className="border p-2 w-full rounded"
              >
                <option value="">Select Currency</option>
                {formConfig.currency_options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="BankAndLetterOfGuaranteeDetails.currency"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* LETTER OF GUARANTEE DETAILS */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start mt-6">
            {/* LEFT SIDE LABEL */}
            <div>
              <h3 className="font-semibold text-gray-700">Letter of Guarantee Details</h3>
              <p className="text-sm text-gray-400">
                Enter guarantee type, amount, dates and purpose
              </p>
            </div>

            {/* RIGHT SIDE INPUTS */}
            <div className="space-y-4 col-span-2">
              <Field
                as="select"
                name="BankAndLetterOfGuaranteeDetails.guarantee_type"
                className="border p-2 w-full rounded"
              >
                <option value="">Select Guarantee Type</option>
                {formConfig.guarantee_type_options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="BankAndLetterOfGuaranteeDetails.guarantee_type"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="number"
                name="BankAndLetterOfGuaranteeDetails.guarantee_amount"
                placeholder="Guarantee Amount"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="BankAndLetterOfGuaranteeDetails.guarantee_amount"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              {/* Issue & Expiry Dates together */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Field
                    type="date"
                    name="BankAndLetterOfGuaranteeDetails.issue_date"
                    className="border p-2 w-full rounded cursor-pointer"
                    onClick={(e) => e.target.showPicker?.()}
                  />
                  
                  <ErrorMessage
                    name="BankAndLetterOfGuaranteeDetails.issue_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="date"
                    name="BankAndLetterOfGuaranteeDetails.expiry_date"
                    className="border p-2 w-full rounded cursor-pointer"
                    onClick={(e) => e.target.showPicker?.()}
                  />
                  
                  <ErrorMessage
                    name="BankAndLetterOfGuaranteeDetails.expiry_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <Field
                name="BankAndLetterOfGuaranteeDetails.purpose"
                placeholder="Purpose"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="BankAndLetterOfGuaranteeDetails.purpose"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => {
  formik.setFieldValue("BankAndLetterOfGuaranteeDetails", {
    bank_name: "",
    branch_name: "",
    guarantee_type: "",
    guarantee_amount: "",
    currency: "",
    issue_date: "",
    expiry_date: "",
    purpose: ""
  });
  formik.setTouched({
    BankAndLetterOfGuaranteeDetails: {
      bank_name: false,
      branch_name: false,
      guarantee_type: false,
      guarantee_amount: false,
      currency: false,
      issue_date: false,
      expiry_date: false,
      purpose: false,
    },
  });
  formik.setErrors({});
}}
              className="border px-4 py-2 rounded"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={async () => {
                const errors = await formik.validateForm();

                // mark all bank guarantee fields touched so errors show immediately
                formik.setTouched({
                  BankAndLetterOfGuaranteeDetails: {
                    bank_name: true,
                    branch_name: true,
                    guarantee_type: true,
                    guarantee_amount: true,
                    currency: true,
                    issue_date: true,
                    expiry_date: true,
                    purpose: true,
                  },
                });

                if (
                  !errors.BankAndLetterOfGuaranteeDetails ||
                  Object.keys(errors.BankAndLetterOfGuaranteeDetails).length === 0
                ) {
                  setCurrentStep(1);
                } else {
                  // Scroll to first error field
                  const firstFieldName = Object.keys(errors.BankAndLetterOfGuaranteeDetails)[0];
                  const firstFieldEl = document.querySelector(`[name="BankAndLetterOfGuaranteeDetails.${firstFieldName}"]`);
                  if (firstFieldEl) {
                    firstFieldEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}


      {/* COMPLETED VIEW 
      {isCompleted && (
        <div className="p-4 text-sm text-gray-600">
          <p>
            <strong>Bank:</strong> {values.bank_name}
          </p>
          <p>
            <strong>Branch:</strong> {values.branch_name}
          </p>
        </div>
      )}
        */}
    </div>



  );

  
}