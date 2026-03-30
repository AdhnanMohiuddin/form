import { Formik, Form } from "formik";
import { useState } from "react";
import { initialValues } from "../constants/initialValues";
import { bankGuaranteeSchema } from "../validation/bankGuarantee.schema";
import { applicantDeliverySchema } from "../validation/applicantDelivery.schema";
import { beneficiaryLiabilitySchema } from "../validation/beneficiaryLiability.schema";
import { totalOrderAmountSchema } from "../validation/totalOrderAmount.schema";
import { STEPS, TOTAL_STEPS } from "../constants/steps";
import BankGuarantee from "../sections/BankGuarantee";
import ApplicantDelivery from "../sections/ApplicantDelivery";
import BeneficiaryLiability from "../sections/BeneficiaryLiability";
import TotalOrderAmount from "../sections/TotalOrderAmount";

const validationSchemas = [
  bankGuaranteeSchema,
  applicantDeliverySchema,
  beneficiaryLiabilitySchema,
  totalOrderAmountSchema,
];

export default function BankingForm() {
  const [currentStep, setCurrentStep] = useState(STEPS.BANK_GUARANTEE);
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep]}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values) => {
        if (!isLastStep) {
          setCurrentStep((prev) => prev + 1);
        } else {
          alert("Form submitted successfully! Check the console for data.");
          console.log("FINAL DATA:", values);
        }
      }}
    >
      {(formik) => (
        <Form className="space-y-4 max-w-6xl w-full mx-auto">
          <BankGuarantee formik={formik} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <ApplicantDelivery formik={formik} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <BeneficiaryLiability formik={formik} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <TotalOrderAmount formik={formik} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </Form>
      )}
    </Formik>
  );
}
