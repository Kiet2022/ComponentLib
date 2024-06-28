import {
  DropListInput,
  Input,
  InputPassword,
  InputSearch,
  TextArea,
} from "@/components";
import SpinnerIcon from "@/public/assets/icons/SpinnerIcon";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format")
    .required("Required"),
  search: Yup.string()
    .trim()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format")
    .required("Required"),
  password: Yup.string()
    .trim()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format")
    .required("Required"),
  description: Yup.string().trim().required("Required"),
  phone: Yup.string()
    .trim()
    .matches(/^(\+\d{1,3})?(\d{8,15})$/, "Invalid phone number format")
    .required("Required"),
});

export default function InputLib() {
  return (
    <div className="flex items-center justify-center h-full bg-black">
      <Formik
        initialValues={{
          email: "",
          password: "",
          search: "",
          description: "",
          phone: undefined,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(
            "formik ",
            values.email,
            values.password,
            values.search,
            values.phone
          );
          setTimeout(() => {
            setSubmitting(false);
          }, 900);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <InputSearch
              name="search"
              id="search"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.search}
              error={errors.search && touched.search ? errors.search : null}
              loading={isSubmitting}
            />
            <Input
              label="Email (required)"
              name="email"
              id="email"
              placeholder="Input"
              leftIcon={<SpinnerIcon className="text-white text-xl" />}
              rightIcon={<SpinnerIcon className="text-white text-xl" />}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email ? errors.email : null}
              loading={isSubmitting}
              required
            />

            <InputPassword
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={
                errors.password && touched.password ? errors.password : null
              }
              loading={isSubmitting}
            />
            <TextArea
              label="Description (optional)"
              name="description"
              id="description"
              placeholder="Input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              rows={2}
              cols={40}
              wordLimit={20}
              externalCounting={false}
              error={
                errors.description && touched.description
                  ? errors.description
                  : null
              }
              loading={isSubmitting}
            />
            <DropListInput
              label="Phone (required)"
              name="phone"
              id="phone"
              onChange={handleChange}
              loading={isSubmitting}
              onBlur={handleBlur}
              value={values.phone}
              error={errors.phone && touched.phone ? errors.phone : null}
              required
            />
            <button
              type="submit"
              className="bg-white rounded-lg w-48 h-12"
              disabled={isSubmitting}
            >
              submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
