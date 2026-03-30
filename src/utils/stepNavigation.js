import { TOTAL_STEPS } from "../constants/steps";

export async function validateAndAdvance(formik, sectionKey, currentStep, setCurrentStep) {
  const errors = await formik.validateForm();
  const sectionErrors = errors[sectionKey];

  if (!sectionErrors || Object.keys(sectionErrors).length === 0) {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      formik.handleSubmit();
    }
  } else {
    scrollToFirstError();
  }
}

function scrollToFirstError() {
  setTimeout(() => {
    const firstErrorEl = document.querySelector(".text-red-500");
    if (firstErrorEl?.scrollIntoView) {
      firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 45);
}
