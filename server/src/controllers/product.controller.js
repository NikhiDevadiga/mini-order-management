import Product from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stockQuantity, image } =
      req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !category?.trim() ||
      stockQuantity === undefined ||
      !image?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }

    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    if (
      Number.isNaN(Number(stockQuantity)) ||
      Number(stockQuantity) < 0 ||
      !Number.isInteger(Number(stockQuantity))
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity must be a non-negative integer",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      stockQuantity: Number(stockQuantity),
      image: image.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stockQuantity, image } =
      req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !category?.trim() ||
      stockQuantity === undefined ||
      !image?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }

    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    if (
      Number.isNaN(Number(stockQuantity)) ||
      Number(stockQuantity) < 0 ||
      !Number.isInteger(Number(stockQuantity))
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity must be a non-negative integer",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category: category.trim(),
        stockQuantity: Number(stockQuantity),
        image: image.trim(),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
