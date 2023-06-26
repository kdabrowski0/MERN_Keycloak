import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import "./AddShoe.css";
import { useAddNewShoeMutation } from "./shoesApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddShoe() {
  const [addNewShoe, { isLoading, isSuccess, isError, error }] =
    useAddNewShoeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      shoeName: "",
      designer: "",
      price: "",
      img_url: "",
      release_date: "",
      collaboration: "",
    },

    validationSchema: Yup.object().shape({
      shoeName: Yup.string()
        .required("Shoe Name is required")
        .min(2, "Shoe name must be at least 2 characters")
        .max(70, "Shoe name must not exceed 70 characters"),
      designer: Yup.string()
        .required("Designer is required")
        .min(2, "Designer must be at least 2 characters")
        .max(30, "Designer must not exceed 30 characters"),
      price: Yup.number()
        .required("Price is required")
        .integer("Price is invalid"),
      img_url: Yup.string().required("Img Url is required"),
      collaboration: Yup.string().required("Collaboration is required"),
      release_date: Yup.date().required("Date is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      await addNewShoe({ ...values });
      resetForm();
    },
  });

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit}>
        <label className="inp">
          <input
            id="shoeName"
            name="shoeName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shoeName}
          />
          <span className="label">Shoe Name</span>
          <span className="focus-bg"></span>
          {formik.touched.shoeName && formik.errors.shoeName ? (
            <div className="err">{formik.errors.shoeName}</div>
          ) : null}
        </label>

        <label className="inp">
          <input
            id="designer"
            name="designer"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.designer}
          />
          <span className="label">Designer</span>
          <span className="focus-bg"></span>
          {formik.touched.designer && formik.errors.designer ? (
            <div className="err">{formik.errors.designer}</div>
          ) : null}
        </label>

        <label className="inp">
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          <span className="label">Price</span>
          <span className="focus-bg"></span>
          {formik.touched.price && formik.errors.price ? (
            <div className="err">{formik.errors.price}</div>
          ) : null}
        </label>

        <label className="inp">
          <input
            id="img_url"
            name="img_url"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.img_url}
          />
          <span className="label">Img URL</span>
          <span className="focus-bg"></span>
          {formik.touched.img_url && formik.errors.img_url ? (
            <div className="err">{formik.errors.img_url}</div>
          ) : null}
        </label>
        <label className="inp">
          <select
            id="collaboration"
            name="collaboration"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.collaboration}
          >
            <option value="" disabled>
              Choose if with collaboration
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <span className="label">Collaboration</span>
          <span className="focus-bg"></span>
          {formik.touched.collaboration && formik.errors.collaboration ? (
            <div className="err">{formik.errors.collaboration}</div>
          ) : null}
        </label>

        <label className="calendar">
          <input
            id="release_date"
            name="release_date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.release_date}
          />
          <span className="label_calendar"></span>
          {formik.touched.release_date && formik.errors.release_date ? (
            <div className="err">{formik.errors.release_date}</div>
          ) : null}
        </label>
        <div className="add-buttons-div">
          <button className="btn btn-add" type="submit">
            Submit
          </button>
          <Link to="/home" className="btn btn-add">
            Back To Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddShoe;
