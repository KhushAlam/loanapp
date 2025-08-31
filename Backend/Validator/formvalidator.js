// middlewares/serviceValidator.js
export default function serviceValidator(req, res, next) {
  const data = req.body;

  switch (true) {

    // Loan type validation
    case !data.loantype || data.loantype.trim().length === 0:
      return res.status(400).json({ message: "Loan type is required" });
      
      
    // Amount validation
    case !data.amount || isNaN(data.amount) || data.amount <= 0:
      return res.status(400).json({ message: "Amount must be a positive number" });

    // Interest validation
    case !data.interest || isNaN(data.interest) || data.interest <= 0:
      return res.status(400).json({ message: "Interest must be a positive number" });

    // Duration validation
    case !data.duration || isNaN(data.duration) || data.duration <= 0:
      return res.status(400).json({ message: "Duration must be greater than 0" });

    // Installment validation
    case !data.installment || isNaN(data.installment) || data.installment <= 0:
      return res.status(400).json({ message: "Installment must be greater than 0" });

    // Total validation
    case !data.total || isNaN(data.total) || data.total <= 0:
      return res.status(400).json({ message: "Total must be greater than 0" });

    // Eligibility validation
    case !data.eligibility || data.eligibility.trim().length === 0:
      return res.status(400).json({ message: "Eligibility is required" });

    default:
      next(); // sab sahi hai to aage route ko control pass karega
  }
}
