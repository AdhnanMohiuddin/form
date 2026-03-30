import { useEffect } from "react";
import { formConfig } from "../constants/formConfig";
import { STEPS } from "../constants/steps";
import { initialValues } from "../constants/initialValues";
import FormField from "../components/FormField";
import StepHeader from "../components/StepHeader";
import StepButtons from "../components/StepButtons";

const STEP = STEPS.TOTAL_ORDER_AMOUNT;
const SECTION_KEY = "TotalOrderAmountDetails";

export default function TotalOrderAmount({ formik, currentStep, setCurrentStep }) {
  const values = formik.values[SECTION_KEY];

  // Auto-calculate VAT amount, total, and final payable
  const { contract_amount, vat_percentage, advance_payment_amount } = values;
  useEffect(() => {
    const contract = parseFloat(contract_amount) || 0;
    const vatPct = parseFloat(vat_percentage) || 0;
    const advance = parseFloat(advance_payment_amount) || 0;

    const vatAmount = contract * (vatPct / 100);
    const totalIncVat = contract + vatAmount;
    const finalPayable = totalIncVat - advance;

    formik.setFieldValue(`${SECTION_KEY}.vat_amount`, vatAmount ? vatAmount.toFixed(2) : "");
    formik.setFieldValue(`${SECTION_KEY}.total_amount_including_vat`, totalIncVat ? totalIncVat.toFixed(2) : "");
    formik.setFieldValue(`${SECTION_KEY}.final_payable_amount`, totalIncVat ? finalPayable.toFixed(2) : "");
  }, [contract_amount, vat_percentage, advance_payment_amount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClear = () => {
    formik.setFieldValue(SECTION_KEY, { ...initialValues[SECTION_KEY] });
    formik.setErrors({});
    formik.setTouched({});
  };

  const handleNext = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      [SECTION_KEY]: Object.fromEntries(
        Object.keys(formik.values[SECTION_KEY]).map((k) => [k, true])
      ),
    });

    if (!errors[SECTION_KEY] || Object.keys(errors[SECTION_KEY]).length === 0) {
      formik.handleSubmit();
    } else {
      setTimeout(() => {
        const el = document.querySelector(".text-red-500");
        if (el?.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 45);
    }
  };

  return (
    <div className="max-w-full mx-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <StepHeader
        stepIndex={STEP}
        currentStep={currentStep}
        title="Total Order Amount details"
        onEdit={setCurrentStep}
      />

      {currentStep === STEP && (
        <div className="px-6 py-6 pr-40 space-y-6">
          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start">
            <div>
              <h3 className="font-semibold text-gray-700">Total Order Amount</h3>
              <p className="text-sm text-gray-400">Enter contract and payment details</p>
            </div>

            <div className="space-y-4 col-span-2">
              <FormField name={`${SECTION_KEY}.contract_amount`} type="number" placeholder="Contract Amount" />
              <FormField name={`${SECTION_KEY}.vat_percentage`} type="number" placeholder="VAT %" />
              <FormField name={`${SECTION_KEY}.vat_amount`} type="number" placeholder="VAT Amount" readOnly />
              <FormField name={`${SECTION_KEY}.total_amount_including_vat`} type="number" placeholder="Total Amount (Including VAT)" readOnly />
              <FormField name={`${SECTION_KEY}.advance_payment_amount`} type="number" placeholder="Advance Payment Amount" />
              <FormField name={`${SECTION_KEY}.final_payable_amount`} type="number" placeholder="Final Payable Amount" readOnly />
              <FormField
                name={`${SECTION_KEY}.currency`}
                as="select"
                placeholder="Select Currency"
                options={formConfig.currency_options}
              />
            </div>
          </div>

          <StepButtons onClear={handleClear} onNext={handleNext} nextLabel="Submit" />
        </div>
      )}
    </div>
  );
}
