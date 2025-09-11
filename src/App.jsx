import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    mortgageAmt: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });
  const [results, setResults] = useState(null);
  const [hasResults, setHasResults] = useState(true);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function calculate(e) {
    e.preventDefault();
    if (formData.mortgageType === "repayment") {
      calculateRepayment();
    } else {
      calculateInterestOnly();
    }
  }

  function calculateInterestOnly() {
    const principal = Number(formData.mortgageAmt);
    const annualRate = Number(formData.interestRate) / 100;
    const monthlyRepayment = (principal * annualRate) / 12;
    setResults(monthlyRepayment);
    setHasResults(true);
  }

  function calculateRepayment() {
    const principal = Number(formData.mortgageAmt); // P
    const annualRate = Number(formData.interestRate); // in %
    const years = Number(formData.mortgageTerm); // in years

    const r = annualRate / 100 / 12; // monthly interest rate
    const n = years * 12; // total months
    const monthlyRepayment =
      (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    setResults(monthlyRepayment);
    setHasResults(true);
  }

  return (
    <div>
      <form className="flex flex-col gap-6 py-8 px-6" onSubmit={calculate}>
        <div id="title-bar" className="flex flex-col gap-2 text-black mb-6">
          <h1 className="font-bold text-2xl text-slate-900">
            Mortgage Calculator
          </h1>
          <p className="text-base text-slate-700 underline cursor-pointer">
            Clear All
          </p>
        </div>

        <div
          id="fields"
          className="text-slate-700 flex flex-col gap-6 justify-between w-full"
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="mortgage-amt"
              className="font-medium"
              name="mortgageAmt"
            >
              Mortgage Amount
            </label>
            <div className="flex border rounded-md w-full h-12">
              <span className="bg-sky-100 rounded-l-md h-full flex items-center px-4 font-bold">
                £
              </span>
              <input
                type="number"
                name="mortgageAmt"
                className="flex-1 outline-none appearance-none h-full px-3"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="mortgage-term" className="font-medium">
              Mortgage Term
            </label>
            <div className="flex border rounded-md w-full h-12">
              <input
                type="number"
                className="flex-1 outline-none appearance-none h-full px-3"
                name="mortgageTerm"
                onChange={handleChange}
              />
              <span className="bg-sky-100 rounded-r-md h-full flex items-center px-4 font-bold">
                years
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="mortgage-rate" className="font-medium">
              Interest Rate
            </label>
            <div className="flex border rounded-md w-full h-12">
              <input
                type="number"
                className="flex-1 outline-none appearance-none h-full px-3"
                name="interestRate"
                onChange={handleChange}
              />
              <span className="bg-sky-100 rounded-r-md h-full flex items-center px-4 font-bold">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="mortgageType" className="font-medium">
              Mortgage Type
            </label>
            <div className="flex border rounded-md w-full items-center h-12 px-4 gap-4">
              <input
                type="radio"
                value="repayment"
                name="mortgageType"
                id="repayment"
                onChange={handleChange}
              />
              <label htmlFor="repayment" className="font-bold cursor-pointer">
                Repayment
              </label>
            </div>
            <div className="flex border rounded-md w-full items-center h-12 px-4 gap-4">
              <input
                type="radio"
                value="interest-only"
                name="mortgageType"
                id="interest-only"
                onChange={handleChange}
              />
              <label
                htmlFor="interest-only"
                className="font-bold cursor-pointer"
              >
                Interest Only
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center text-lg font-bold justify-center cursor-pointer bg-[#D8DB2F] rounded-full py-4 text-black"
          >
            <img
              src="src/assets/images/icon-calculator.svg"
              alt="calculator icon"
              className="mr-3"
            />
            Calculate Repayments
          </button>
        </div>
      </form>
      {!hasResults ? (
        <div className="gap-4 bg-slate-900 flex flex-col text-white justify-center text-center items-center p-6 rounded-md">
          <img
            src="src/assets/images/illustration-empty.svg"
            alt="empty results"
            className="w-[192px]"
          />
          <h2 className="text-2xl font-bold">Results Shown here</h2>
          <p className="text-slate-300 text-base font-medium">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        //replace hardcoded numbers with dynamic values
        <div className="gap-4 bg-slate-900 flex flex-col text-white  px-6 py-8 rounded-md">
          <h3 className="text-2xl font-bold">Your Results</h3>
          <p className="text-slate-300">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="mt-6 border-t bg-[#000000]/25 border-t-[#D8DB2F] border-t-4 py-4 px-6 rounded-lg">
            <p className="text-slate-300">Your monthly repayments</p>
            <p className="text-[40px] text-[#D8DB2F] font-bold">$1,787.74</p>
            <hr className="mt-4 mb-4 opacity-25 fill-[#9ABED5]" />
            <p className="text-slate-300">Total you'll repay over the term</p>
            <p className="text-2xl mt-2 font-bold">$539,322.94</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
