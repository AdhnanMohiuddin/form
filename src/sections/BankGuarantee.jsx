import { formConfig } from "../constants/formConfig";
import { STEPS } from "../constants/steps";
import FormField from "../components/FormField";
import StepHeader from "../components/StepHeader";
import StepButtons from "../components/StepButtons";
import { initialValues } from "../constants/initialValues";

const STEP = STEPS.BANK_GUARANTEE;
const SECTION_KEY = "BankAndLetterOfGuaranteeDetails";

export default function BankGuarantee({ formik, currentStep, setCurrentStep }) {
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
      setCurrentStep(STEP + 1);
    } else {
      const firstFieldName = Object.keys(errors[SECTION_KEY])[0];
      const el = document.querySelector(`[name="${SECTION_KEY}.${firstFieldName}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="max-w-full mx-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <StepHeader
        stepIndex={STEP}
        currentStep={currentStep}
        title="Bank & Letter of Guarantee details"
        onEdit={setCurrentStep}
      />

      {currentStep === STEP && (
        <div className="px-6 py-6 pr-40 space-y-6">
          {/* Bank Details */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start">
            <div>
              <h3 className="font-semibold text-gray-700">Bank Details</h3>
              <p className="text-sm text-gray-400">
                Enter bank information to process the guarantee
              </p>
            </div>

            <div className="space-y-4 col-span-2">
              <FormField name={`${SECTION_KEY}.bank_name`} placeholder="Bank Name" />
              <FormField name={`${SECTION_KEY}.branch_name`} placeholder="Branch Name" />
              <FormField
                name={`${SECTION_KEY}.currency`}
                as="select"
                placeholder="Select Currency"
                options={formConfig.currency_options}
              />
            </div>
          </div>

          {/* Letter of Guarantee Details */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start mt-6">
            <div>
              <h3 className="font-semibold text-gray-700">Letter of Guarantee Details</h3>
              <p className="text-sm text-gray-400">
                Enter guarantee type, amount, dates and purpose
              </p>
            </div>

            <div className="space-y-4 col-span-2">
              <FormField
                name={`${SECTION_KEY}.guarantee_type`}
                as="select"
                placeholder="Select Guarantee Type"
                options={formConfig.guarantee_type_options}
              />
              <FormField
                name={`${SECTION_KEY}.guarantee_amount`}
                type="number"
                placeholder="Guarantee Amount"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name={`${SECTION_KEY}.issue_date`}
                  type="date"
                  placeholder="Issue Date"
                  onClick={(e) => e.target.showPicker?.()}
                  className="cursor-pointer"
                />
                <FormField
                  name={`${SECTION_KEY}.expiry_date`}
                  type="date"
                  placeholder="Expiry Date"
                  onClick={(e) => e.target.showPicker?.()}
                  className="cursor-pointer"
                />
              </div>

              <FormField name={`${SECTION_KEY}.purpose`} placeholder="Purpose" />
            </div>
          </div>

          <StepButtons onClear={handleClear} onNext={handleNext} />
        </div>
      )}
    </div>
  );
}
