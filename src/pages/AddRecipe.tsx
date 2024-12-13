import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeInputField from '../components/InputField/RecipeInputFields';
import DynamicList from '../components/InputField/DynamicListInput';
import { useAddRecipe } from '../hooks/useAddRecipe';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  } = useAddRecipe();

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className="p-4" style={{ width: '70%' }}>
          <h2 className="mb-4">Add Recipe</h2>

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
                inputStyle={{ borderColor: 'black' }}
              />

              <DynamicList
                label="Steps"
                items={steps}
                onAdd={handleAddStep}
                onChange={handleStepChange}
                onRemove={handleRemoveStep}
                inputStyle={{ borderColor: 'black' }}
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
              <div className="mb-3">
                <label htmlFor="image" className="form-label fw-bold">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  style={{ borderColor: 'black' }}
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />

                {imagePreview ? (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        border: '1px solid black',
                      }}
                    />
                    <button type="button" className="btn btn-danger mt-2" onClick={handleRemoveImage}>
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-muted">No file chosen</p>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-3">
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
