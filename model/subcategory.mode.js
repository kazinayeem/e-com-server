import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema(
    {
      
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      categoryId: [
        {
          type: mongoose.Schema.Types.String,
          ref: 'Category', 
          required: true,
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  const SubCategory = mongoose.model('SubCategory', subCategorySchema);
  
  export default  SubCategory
  
  