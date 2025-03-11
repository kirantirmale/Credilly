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
  .test("is-valid-mobile", "Enter a valid  number", (value) => {
    if (!value) return false;

    const cleanedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const saudiRegex = /^966\d{9}$/;
    const indiaRegex = /^91\d{10}$/;

    return saudiRegex.test(cleanedValue) || indiaRegex.test(cleanedValue);
  })
  .required("Mobile number is required"),

    make: yup.string().required("Make is required"),
    model: yup.string().required("Model is required"),
    financingType: yup.string().required("Select financing type"),
    incomeSource: yup.string().required("Select income source"),
    estimatedAmount: yup.string().required("Estimated Amount is required"),
    bank: yup.string().when("incomeSource", {
        is: "salaried",
        then: (schema) => schema.required("Bank is required"),
    }),
    salary: yup.string().required("Income Amount is required"),
    companyName: yup.string().required("Company Name is required"),
    termsAccepted: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

