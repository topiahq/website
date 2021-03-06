import React, { useState } from "react"
import { Formik } from "formik"
import addToMailchimp from "gatsby-plugin-mailchimp"
export default function Signp() {
  const [loading, setloading] = useState(false)
  const [Sucess, setSucess] = useState(false)
  const [errormail, seterrormail] = useState(false)
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = "Required"
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address"
        }
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setloading(true)
        seterrormail(false)
        const result = await addToMailchimp(values.email)
        console.log(result)
        if (result.result === "success") {
          setloading(false)
          setSucess(true)
        } else if (result.result === "error") {
          seterrormail("Email is already subscribed.")
          setloading(false)
        }
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
          <div
            className="flex-form"
            id={!loading ? (Sucess ? "active" : "") : ""}
          >
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Your Email"
              onClick={() => setSucess(false)}
            />

            <button type="submit">
              {!loading ? (Sucess ? "Done" : "Sign up") : "Sending..."}
            </button>
          </div>
          <div className="error">
            {errors.email && touched.email && errors.email}
            {!!errormail && errormail}
          </div>
          <span>
            We care about keeping your data safe. Read our Privacy Policy.
          </span>
        </form>
      )}
    </Formik>
  )
}
