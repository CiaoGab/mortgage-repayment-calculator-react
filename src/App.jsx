import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    mortgageAmt: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });
  const [results, setResults] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [hasResults, setHasResults] = useState(false);
  const [errors, setErrors] = useState({
    mortgageAmt: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function calculate(e) {
    e.preventDefault();
    // Basic required-field validation
    const newErrors = {
      mortgageAmt: formData.mortgageAmt === "" ? "this field is required" : "",
      mortgageTerm: formData.mortgageTerm === "" ? "this field is required" : "",
      interestRate: formData.interestRate === "" ? "this field is required" : "",
      mortgageType: formData.mortgageType === "" ? "this field is required" : "",
    };
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((msg) => msg);
    if (hasAnyError) {
      setHasResults(false);
      return;
    }

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
    const years = Number(formData.mortgageTerm);
    const totalRepayment = monthlyRepayment * years * 12 + principal;
    setHasResults(true);
    setResults(monthlyRepayment);
    setTotalRepayment(totalRepayment);
  }

  function calculateRepayment() {
    const principal = Number(formData.mortgageAmt);
    const annualRate = Number(formData.interestRate);
    const years = Number(formData.mortgageTerm);
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const monthlyRepayment =
      (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    setResults(monthlyRepayment);
    setTotalRepayment(monthlyRepayment * n);
    setHasResults(true);
  }

  function clearAll() {
    setFormData({
      mortgageAmt: "",
      mortgageTerm: "",
      interestRate: "",
      mortgageType: "",
    });
    setResults(null);
    setTotalRepayment(0);
    setHasResults(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg grid lg:grid-cols-2 md:gap-10 lg:gap-16 md:p-10">
        <form
          className="flex flex-col gap-6 p-6 md:p-0 h-full overflow-y-auto"
          onSubmit={calculate}
        >
          <div className="flex flex-col gap-2 text-black mb-4">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-slate-900">
              Mortgage Calculator
            </h1>
            <p
              className="text-base text-slate-700 underline cursor-pointer"
              onClick={clearAll}
            >
              Clear All
            </p>
          </div>

          <div className="text-slate-700 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="mortgage-amt" className="font-medium">
                Mortgage Amount
              </label>
              <div className={`flex border rounded-md w-full h-12 ${errors.mortgageAmt ? "border-red-500" : ""}`}>
                <span className={`rounded-l-md h-full flex items-center px-4 font-bold ${errors.mortgageAmt ? "bg-red-600 text-white" : "bg-sky-100"}`}>
                  £
                </span>
                <input
                  type="number"
                  name="mortgageAmt"
                  className={`flex-1 outline-none appearance-none h-full px-3 ${errors.mortgageAmt ? "placeholder-red-400" : ""}`}
                  value={formData.mortgageAmt}
                  onChange={handleChange}
                />
              </div>
              {errors.mortgageAmt && (
                <p className="text-red-600 text-sm">{errors.mortgageAmt}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 flex-wrap">
              <div className="flex-1 flex flex-col gap-3">
                <label htmlFor="mortgage-term" className="font-medium">
                  Mortgage Term
                </label>
                <div className={`flex border rounded-md w-full h-12 ${errors.mortgageTerm ? "border-red-500" : ""}`}>
                  <input
                    type="number"
                    className={`flex-1 outline-none appearance-none h-full px-3 ${errors.mortgageTerm ? "placeholder-red-400" : ""}`}
                    name="mortgageTerm"
                    value={formData.mortgageTerm}
                    onChange={handleChange}
                  />
                  <span className={`rounded-r-md h-full flex items-center px-4 font-bold ${errors.mortgageTerm ? "bg-red-600 text-white" : "bg-sky-100"}`}>
                    years
                  </span>
                </div>
                {errors.mortgageTerm && (
                  <p className="text-red-600 text-sm">{errors.mortgageTerm}</p>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-3">
                <label htmlFor="mortgage-rate" className="font-medium">
                  Interest Rate
                </label>
                <div className={`flex border rounded-md w-full h-12 ${errors.interestRate ? "border-red-500" : ""}`}>
                  <input
                    type="number"
                    className={`flex-1 outline-none appearance-none h-full px-3 ${errors.interestRate ? "placeholder-red-400" : ""}`}
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                  />
                  <span className={`rounded-r-md h-full flex items-center px-4 font-bold ${errors.interestRate ? "bg-red-600 text-white" : "bg-sky-100"}`}>
                    %
                  </span>
                </div>
                {errors.interestRate && (
                  <p className="text-red-600 text-sm">{errors.interestRate}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="mortgageType" className="font-medium">
                Mortgage Type
              </label>
              <div className={`flex border rounded-md w-full items-center h-12 px-4 gap-4 ${errors.mortgageType ? "border-red-500" : ""}`}>
                <input
                  type="radio"
                  value="repayment"
                  name="mortgageType"
                  id="repayment"
                  checked={formData.mortgageType === "repayment"}
                  onChange={handleChange}
                />
                <label htmlFor="repayment" className="font-bold cursor-pointer">
                  Repayment
                </label>
              </div>
              <div className={`flex border rounded-md w-full items-center h-12 px-4 gap-4 ${errors.mortgageType ? "border-red-500" : ""}`}>
                <input
                  type="radio"
                  value="interest-only"
                  name="mortgageType"
                  id="interest-only"
                  checked={formData.mortgageType === "interest-only"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="interest-only"
                  className="font-bold cursor-pointer"
                >
                  Interest Only
                </label>
              </div>
              {errors.mortgageType && (
                <p className="text-red-600 text-sm">{errors.mortgageType}</p>
              )}
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
          <div className="h-full flex flex-col justify-center items-center gap-4 bg-slate-900 text-white p-6 rounded-md rounded-bl-[100px]">
            <img
              src="src/assets/images/illustration-empty.svg"
              alt="empty results"
              className="w-[192px]"
            />
            <h2 className="text-2xl font-bold">Results Shown here</h2>
            <p className="text-slate-300 text-base font-medium text-center">
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col gap-4 bg-slate-900 text-white px-6 py-8 rounded-md">
            <h3 className="text-2xl md:text-3xl font-bold">Your Results</h3>
            <p className="text-slate-300">
              Your results are shown below based on the information you
              provided. To adjust, edit the form and click “calculate
              repayments” again.
            </p>
            <div className="mt-6 bg-[#000000]/25 border-t-[#D8DB2F] border-t-4 py-4 px-6 rounded-lg">
              <p className="text-slate-300">Your monthly repayments</p>
              <p className="text-[40px] md:text-[48px] lg:text-[56px] text-[#D8DB2F] font-bold">
                ${results.toFixed(2)}
              </p>
              <hr className="mt-4 mb-4 opacity-25 fill-[#9ABED5]" />
              <p className="text-slate-300">Total you'll repay over the term</p>
              <p className="text-2xl md:text-3xl mt-2 font-bold">
                ${totalRepayment.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
