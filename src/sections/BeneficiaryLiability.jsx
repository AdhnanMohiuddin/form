import { STEPS } from "../constants/steps";
import { validateAndAdvance } from "../utils/stepNavigation";
import { initialValues } from "../constants/initialValues";
import FormField from "../components/FormField";
import StepHeader from "../components/StepHeader";
import StepButtons from "../components/StepButtons";

const STEP = STEPS.BENEFICIARY_LIABILITY;
const SECTION_KEY = "BeneficiaryAndLiabilityDetails";

export default function BeneficiaryLiability({ formik, currentStep, setCurrentStep }) {
  const handleClear = () => {
    formik.setFieldValue(SECTION_KEY, { ...initialValues[SECTION_KEY] });
    formik.setErrors({});
    formik.setTouched({});
  };

  const handleNext = async () => {
    formik.setTouched({
      [SECTION_KEY]: Object.fromEntries(
        Object.keys(formik.values[SECTION_KEY]).map((k) => [k, true])
      ),
    });
    await validateAndAdvance(formik, SECTION_KEY, currentStep, setCurrentStep);
  };

  return (
    <div className="max-w-full mx-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <StepHeader
        stepIndex={STEP}
        currentStep={currentStep}
        title="Beneficiary & Liability details"
        onEdit={setCurrentStep}
      />

      {currentStep === STEP && (
        <div className="px-6 py-6 pr-40 space-y-6">
          <div className="grid grid-cols-3 gap-x-10 gap-y-6 items-start">
            <div>
              <h3 className="font-semibold text-gray-700">Beneficiary & Liability Details</h3>
              <p className="text-sm text-gray-400">Enter beneficiary and liability information</p>
            </div>

            <div className="space-y-4 col-span-2">
              <FormField name={`${SECTION_KEY}.beneficiary_name`} placeholder="Beneficiary Name" />
              <FormField name={`${SECTION_KEY}.beneficiary_address`} placeholder="Address" />
              <FormField name={`${SECTION_KEY}.liability_percentage`} type="number" placeholder="Liability %" />
              <FormField name={`${SECTION_KEY}.claim_period_days`} type="number" placeholder="Claim Period (Days)" />
              <FormField name={`${SECTION_KEY}.terms_conditions`} as="textarea" placeholder="Terms & Conditions" />
            </div>
          </div>

          <StepButtons onClear={handleClear} onNext={handleNext} />
        </div>
      )}
    </div>
  );
}
