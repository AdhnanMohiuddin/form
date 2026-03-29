import { Formik, Form } from "formik";
import { useState } from "react";
import { initialValues } from "../constants/initialValues";
import { applicantDeliverySchema } from "../validation/applicantDelivery.schema";
import { bankGuaranteeSchema } from "../validation/bankGuarantee.schema";
import { beneficiaryLiabilitySchema } from "../validation/beneficiaryLiability.schema";
import { totalOrderAmountSchema } from "../validation/totalOrderAmount.schema";
import BankGuarantee from "../sections/BankGuarantee";
import ApplicantDelivery from "../sections/ApplicantDelivery";
import BeneficiaryLiability from "../sections/BenificiaryLiablity";
import TotalOrderAmount from "../sections/TotalOrderAmount";

export default function BankingForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const validationSchemas = [
    bankGuaranteeSchema,
    applicantDeliverySchema,
    beneficiaryLiabilitySchema,
    totalOrderAmountSchema,
  ];
  const isLastStep = currentStep === 3;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep]}
      validateOnBlur={false}
      validateOnChange={false}
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
        
        <Form className="p-6 space-y-4 max-w-6xl w-full mx-auto">

          <BankGuarantee
            formik={formik}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          <ApplicantDelivery
            formik={formik}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          <BeneficiaryLiability
          formik={formik}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
            
          <TotalOrderAmount
            formik={formik}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
            <h3 className="text-sm font-medium" >Testing</h3>
            <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
             <div>Current Step: {currentStep}</div>
        </Form>
      )}
    </Formik>
  );
}
