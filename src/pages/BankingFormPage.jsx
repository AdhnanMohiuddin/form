import BankingForm from "../components/BankingForm";

const BankingFormPage = () => {
  return (
    <div>
      <div className="text-sm text-gray-400 mb-4">
        <span className="cursor-pointer hover:underline">Drafts</span>
        <span className="mx-1">{">"}</span>
        <span>Edit details</span>
      </div>
      <BankingForm />
    </div>
  );
};

export default BankingFormPage;
