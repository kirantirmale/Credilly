import * as yup from "yup";

export const validationSchema = yup.object().shape({
  nationalId: yup
    .string()
    .matches(/^\d{10}$/, "National ID must be exactly 10 digits")
    .required("National ID is required"),

  month: yup.string().required("Month is required"),
  year: yup.string().required("Year is required"),

  phoneNumber: yup
    .string()
    .test("is-valid-mobile", "Enter a valid number", (value) => {
      if (!value) return false;
      const cleanedValue = value.replace(/\D/g, "");
      const saudiRegex = /^966\d{9}$/;
      const indiaRegex = /^91\d{10}$/;
      return saudiRegex.test(cleanedValue) || indiaRegex.test(cleanedValue);
    })
    .required("Mobile number is required"),

  make: yup.string().required("Make is required"),
  bank: yup.string().required("Bank is required"),
  model: yup.string().required("Model is required"),
  financingType: yup.string().required("Select financing type"),
  carPrice: yup
    .number()
    .typeError("Car price must be a number")
    .required("Car price is required"),

  downPayment: yup
    .number()
    .typeError("Down payment must be a number")
    .required("Down payment is required"),

  financeAmount: yup
    .number()
    .typeError("Finance amount must be a number")
    .required("Finance amount is required"),

  incomeSource: yup.string().required("Select income source"),

  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Income Amount is required"),

  companyName: yup.string().required("Company Name is required"),

  monthlyExpenses: yup
    .number()
    .typeError("Monthly expenses must be a number")
    .required("Monthly expenses are required"),
});





