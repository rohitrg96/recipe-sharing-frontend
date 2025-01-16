import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddRecipe.css';
import RecipeInputField from '../../components/InputField/RecipeInputFields/RecipeInputFields';
import DynamicList from '../../components/InputField/DynamicListInput/DynamicListInput';
import { useAddRecipe } from '../../hooks/useAddRecipe';
import Navbar from '../../components/InputField/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AddRecipe: React.FC = () => {
  const {
    formik,
    imagePreview,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    handleUpload,
  } = useAddRecipe();

  return (
    <>
      <Navbar />
      <div className="add-recipe-container">
        <div className="add-recipe-form">
          <h2 className="add-recipe-title">Add Recipe</h2>

          <form onSubmit={formik.handleSubmit} className="row">
            <div className="col-md-8">
              {/* Recipe Title Input */}
              <RecipeInputField
                label="Recipe Title"
                id="title"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.title && formik.errors.title}
              />

              {/* Ingredients List */}
              <DynamicList
                label="Ingredients"
                items={formik.values.ingredients}
                onAdd={() =>
                  formik.setFieldValue('ingredients', [
                    ...formik.values.ingredients,
                    '',
                  ])
                }
                onChange={(index, value) => {
                  const updatedIngredients = [...formik.values.ingredients];
                  updatedIngredients[index] = value;
                  formik.setFieldValue('ingredients', updatedIngredients);
                }}
                onRemove={(index) => {
                  const updatedIngredients = formik.values.ingredients.filter(
                    (_, i) => i !== index,
                  );
                  formik.setFieldValue('ingredients', updatedIngredients);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.ingredients && formik.errors.ingredients}
              />

              {/* Steps List */}
              <DynamicList
                label="Steps"
                items={formik.values.steps}
                onAdd={() =>
                  formik.setFieldValue('steps', [...formik.values.steps, ''])
                }
                onChange={(index, value) => {
                  const updatedSteps = [...formik.values.steps];
                  updatedSteps[index] = value;
                  formik.setFieldValue('steps', updatedSteps);
                }}
                onRemove={(index) => {
                  const updatedSteps = formik.values.steps.filter(
                    (_, i) => i !== index,
                  );
                  formik.setFieldValue('steps', updatedSteps);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.steps && formik.errors.steps}
              />

              {/* Preparation Time Input */}
              <RecipeInputField
                label="Preparation Time (mins)"
                id="prepTime"
                type="number"
                value={formik.values.preparationTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                name="preparationTime"
                error={
                  formik.touched.preparationTime &&
                  formik.errors.preparationTime
                }
              />
            </div>
            <div className="col-md-4">
              <div className="upload-section">
                <label htmlFor="image" className="form-label fw-bold">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="form-control upload-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />

                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={handleRemoveImage}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-muted">No file chosen</p>
                )}

                <button
                  type="button"
                  className="btn btn-primary mt-3 upload-button"
                  onClick={handleUpload}
                  disabled={!imagePreview}
                >
                  Upload Image
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-3 submit-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddRecipe;
