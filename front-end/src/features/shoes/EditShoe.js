import { useState, useEffect } from "react";
import { useUpdateShoeMutation, selectShoeById } from "./shoesApiSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditShoe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shoe = useSelector((state) => selectShoeById(state, id));

  const [updateShoe, { isLoading, isSuccess, isError, error }] =
    useUpdateShoeMutation();

  const [shoeName, setName] = useState(shoe?.shoeName);
  const [designer, setDesigner] = useState(shoe?.designer);
  const [price, setPrice] = useState(shoe?.price);
  const [img_url, setImgUrl] = useState(shoe?.img_url);
  const [release_date, setDate] = useState(shoe?.release_date);
  const [collaboration, setCollaboration] = useState(shoe?.collaboration);
  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      shoeName: shoeName,
      designer: designer,
      price: price,
      img_url: img_url,
      release_date: release_date,
      collaboration: collaboration,
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

    onSubmit: async (values) => {
      await updateShoe({ id: shoe.id, ...values });
    },
  });

  if (!shoe) {
    return (
      <section>
        <h2>Shoes not found!</h2>
      </section>
    );
  }

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit}>
        <label className="inp">
          <input
            id="shoeName"
            name="shoeName"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
              setName(e.target.value);
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setDesigner(e.target.value);
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setPrice(e.target.value);
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setImgUrl(e.target.value);
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setCollaboration(e.target.value);
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setDate(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.release_date}
          />
          <span className="label_calendar"></span>
          {formik.touched.release_date && formik.errors.release_date ? (
            <div className="err">{formik.errors.release_date}</div>
          ) : null}
        </label>

        <div className="edit-buttons-div">
          <button className="btn btn-edit" type="submit">
            Edit Shoe
          </button>
          <Link to="/home" className="btn btn-edit">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditShoe;
