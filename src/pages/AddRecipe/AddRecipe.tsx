import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddRecipe.css'; // Import the external CSS file
import RecipeInputField from '../../components/InputField/RecipeInputFields/RecipeInputFields';
import DynamicList from '../../components/InputField/DynamicListInput/DynamicListInput';
import { useAddRecipe } from '../../hooks/useAddRecipe';
import Navbar from '../../components/InputField/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AddRecipe: React.FC = () => {
  const {
    title,
    ingredients,
    steps,
    preparationTime,
    imagePreview,
    fileInputRef,
    error,
    success,
    handleAddIngredient,
    handleIngredientChange,
    handleRemoveIngredient,
    handleAddStep,
    handleStepChange,
    handleRemoveStep,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    setTitle,
    setPreparationTime,
    handleUpload,
    uploadStatus,
  } = useAddRecipe();

  return (
    <>
      <Navbar />
      <div className="add-recipe-container">
        <div className="add-recipe-form">
          <h2 className="add-recipe-title">Add Recipe</h2>

          {/* Display Success or Error Messages */}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-8">
              <RecipeInputField
                label="Recipe Title"
                id="title"
                type="text"
                value={title}
                onChange={(value) => setTitle(value as string)}
                required
              />
              <DynamicList
                label="Ingredients"
                items={ingredients}
                onAdd={handleAddIngredient}
                onChange={handleIngredientChange}
                onRemove={handleRemoveIngredient}
              />
              <DynamicList
                label="Steps"
                items={steps}
                onAdd={handleAddStep}
                onChange={handleStepChange}
                onRemove={handleRemoveStep}
              />
              <RecipeInputField
                label="Preparation Time (mins)"
                id="prepTime"
                type="number"
                value={preparationTime}
                onChange={(value) => setPreparationTime(value as string)}
                required
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

                {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
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
