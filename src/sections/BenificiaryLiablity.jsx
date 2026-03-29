import { Field, ErrorMessage } from "formik";
import { Check } from "lucide-react";

export default function BeneficiaryLiability({ formik, currentStep, setCurrentStep }) {
  const isCompleted = currentStep > 2;
  const values = formik.values.BeneficiaryAndLiabilityDetails;

  return (
    <div className="max-w-full mx-auto border rounded-xl bg-white shadow-sm mb-6">

      {/* HEADER */}
      <div className={`flex justify-between items-center p-4 ${currentStep === 2 ? 'border-b' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200"}`}>
            {isCompleted ? <Check className="text-white w-5 h-5 stroke-[4]" /> : "3"}
          </div>
          <h2 className="font-semibold text-lg">Beneficiary & Liability Details</h2>
        </div>

        {isCompleted && (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}
      </div>

      {/* ACTIVE FORM */}
      {currentStep === 2 && (
        <div className="p-6 space-y-6 pr-25"
          onFocus={(e) => {
            const name = e.target.name;
            if (name) {
              formik.setFieldError(name, undefined);
              formik.setFieldTouched(name, false);
            }
          }}
        >

          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start">
            <div>
              <h3 className="font-semibold text-gray-700">Beneficiary & Liability Details</h3>
              <p className="text-sm text-gray-400">Enter beneficiary and liability information</p>
            </div>

            <div className="space-y-4 col-span-2">
              <Field
                name="BeneficiaryAndLiabilityDetails.beneficiary_name"
                placeholder="Beneficiary Name"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="BeneficiaryAndLiabilityDetails.beneficiary_name" component="div" className="text-red-500 text-sm mt-1" />

             
              <Field
                name="BeneficiaryAndLiabilityDetails.beneficiary_address"
                placeholder="Address"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="BeneficiaryAndLiabilityDetails.beneficiary_address" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="BeneficiaryAndLiabilityDetails.liability_percentage"
                placeholder="Liability %"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="BeneficiaryAndLiabilityDetails.liability_percentage" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="BeneficiaryAndLiabilityDetails.claim_period_days"
                placeholder="Claim Period (Days)"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="BeneficiaryAndLiabilityDetails.claim_period_days" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                as="textarea"
                name="BeneficiaryAndLiabilityDetails.terms_conditions"
                placeholder="Terms & Conditions"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="BeneficiaryAndLiabilityDetails.terms_conditions" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() =>{
                formik.setFieldValue("BeneficiaryAndLiabilityDetails", {
                  beneficiary_name: "",
                  beneficiary_cr_number: "",
                  beneficiary_address: "",
                  liability_percentage: "",
                  claim_period_days: "",
                  terms_conditions: ""
                });
                formik.setTouched({ BeneficiaryAndLiabilityDetails: Object.fromEntries(
                  Object.keys(formik.values.BeneficiaryAndLiabilityDetails).map(k => [k, false])
                )});

              }}
              className="border px-4 py-2 rounded"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={async () => {
                const errors = await formik.validateForm();
                formik.setTouched({ BeneficiaryAndLiabilityDetails: Object.fromEntries(
                  Object.keys(formik.values.BeneficiaryAndLiabilityDetails).map(k => [k, true])
                )});

                if (!errors.BeneficiaryAndLiabilityDetails || Object.keys(errors.BeneficiaryAndLiabilityDetails).length === 0) {
                  if (currentStep < 3) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    formik.handleSubmit();
                  }
                } else {
                  setTimeout(() => {
                    const firstErrorEl = document.querySelector('.text-red-500');
                    if (firstErrorEl?.scrollIntoView) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 45);
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
          <p><strong>Beneficiary:</strong> {values.beneficiary_name}</p>
          <p><strong>CR Number:</strong> {values.beneficiary_cr_number}</p>
          <p><strong>Address:</strong> {values.beneficiary_address}</p>
          <p><strong>Liability %:</strong> {values.liability_percentage}</p>
          <p><strong>Claim Period:</strong> {values.claim_period_days}</p>
        </div>
      )}
      */}
    </div>
  );
}