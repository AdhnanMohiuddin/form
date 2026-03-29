import { Field, ErrorMessage } from "formik";
import { Check } from "lucide-react";
import { formConfig } from "../constants/formConfig"; // for currency

export default function TotalOrderAmount({ formik, currentStep, setCurrentStep }) {
  const isCompleted = currentStep > 3;
  const values = formik.values.TotalOrderAmountDetails;

  return (
    <div className="max-w-full mx-auto border rounded-xl bg-white shadow-sm mb-6">

      {/* HEADER */}
      <div className={`flex justify-between items-center p-4 ${currentStep === 3 ? 'border-b' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200"}`}>
            {isCompleted ? <Check className="text-white w-5 h-5 stroke-[4]" /> : "4"}
          </div>
          <h2 className="font-semibold text-lg">Total Order Amount</h2>
        </div>

        {isCompleted && (
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}
      </div>

      {/* ACTIVE FORM */}
      {currentStep === 3 && (
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
              <h3 className="font-semibold text-gray-700">Total Order Amount</h3>
              <p className="text-sm text-gray-400">Enter contract and payment details</p>
            </div>

            <div className="space-y-4 col-span-2">
              <Field
                type="number"
                name="TotalOrderAmountDetails.contract_amount"
                placeholder="Contract Amount"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="TotalOrderAmountDetails.contract_amount" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="TotalOrderAmountDetails.vat_percentage"
                placeholder="VAT %"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="TotalOrderAmountDetails.vat_percentage" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="TotalOrderAmountDetails.vat_amount"
                placeholder="VAT Amount"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="TotalOrderAmountDetails.vat_amount" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="TotalOrderAmountDetails.total_amount_including_vat"
                placeholder="Total Amount (Including VAT)"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="TotalOrderAmountDetails.total_amount_including_vat" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="TotalOrderAmountDetails.advance_payment_amount"
                placeholder="Advance Payment Amount"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="TotalOrderAmountDetails.advance_payment_amount" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                type="number"
                name="TotalOrderAmountDetails.final_payable_amount"
                placeholder="Final Payable Amount"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage name="TotalOrderAmountDetails.final_payable_amount" component="div" className="text-red-500 text-sm mt-1" />

              <Field
                as="select"
                name="TotalOrderAmountDetails.currency"
                className="border p-2 w-full rounded"
              >
                <option value="">Select Currency</option>
                {formConfig.currency_options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
              <ErrorMessage name="TotalOrderAmountDetails.currency" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() =>{
                formik.setFieldValue("TotalOrderAmountDetails", {
                  contract_amount: "",
                  vat_percentage: "",
                  vat_amount: "",
                  total_amount_including_vat: "",
                  advance_payment_amount: "",
                  final_payable_amount: "",
                  currency: ""
                });
                formik.setTouched({ TotalOrderAmountDetails: Object.fromEntries(
                  Object.keys(formik.values.TotalOrderAmountDetails).map(k => [k, false])
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
                formik.setTouched({ TotalOrderAmountDetails: Object.fromEntries(
                  Object.keys(formik.values.TotalOrderAmountDetails).map(k => [k, true])
                )});

                if (!errors.TotalOrderAmountDetails || Object.keys(errors.TotalOrderAmountDetails).length === 0) {
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
          <p><strong>Contract Amount:</strong> {values.contract_amount}</p>
          <p><strong>VAT %:</strong> {values.vat_percentage}</p>
          <p><strong>VAT Amount:</strong> {values.vat_amount}</p>
          <p><strong>Total Amount:</strong> {values.total_amount_including_vat}</p>
          <p><strong>Advance Payment:</strong> {values.advance_payment_amount}</p>
          <p><strong>Final Payable:</strong> {values.final_payable_amount}</p>
          <p><strong>Currency:</strong> {values.currency}</p>
        </div>
      )}
      */}
    </div>
  );
}