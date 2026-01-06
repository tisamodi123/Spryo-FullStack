import Product from "../models/Product.mjs";

export const getProducts = async (req, res) => {
  try {
    // 1) read query params from the URL
    const { category, search, minPrice, maxPrice } = req.query;

    // 2) build a Mongo filter object
    const filter = {};

    // category filter (skip if "All" or not provided)
    if (category && category !== "All") {
      filter.category = category;
    }

    // text search on product name (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 3) fetch products from DB
    const products = await Product.find(filter);

    // 4) send response
    return res.json({ success: true, products });
  } catch (error) {
    console.error("getProducts error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//review

// export const addReview = async (req, res) => {
//   try {
//     // User rating and comment
//     const { rating, comment } = req.body;

//     // URL se Product ID lekar database mein check karna
//     const product = await Product.findById(req.params.id);

    
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     /* 3. PEHLE REVIEW DIYA HAI? 
//        Check karna ki is logged-in user ne pehle se review toh nahi diya.
//        Hum reviews array mein check kar rahe hain agar 'user id' match hoti hai. */
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     // Agar mil gaya, toh doobara review dene se roko
//     if (alreadyReviewed)
//       return res.status(400).json({ message: "Already reviewed" });

//     // 4. NAYA REVIEW OBJECT BANANA
//     const review = {
//       user: req.user._id, // User ki ID (Auth Middleware se aati hai)
//       name: req.user.name, // User name
//       rating: Number(rating), // Rating 
//       comment, // User message
//     };

//     // 5. DATABASE UPDATE KARNA
//     // new review array 
//     product.reviews.push(review);

//     // Total reviews count update 
//     product.numReviews = product.reviews.length;

//     /* 6. AVERAGE RATING CALCULATE KARNA 
//        Formula: Total Sum of Ratings / Total Reviews */
//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     // Changes in database permanently
//     await product.save();

//     // Success response 
//     res.status(201).json({ success: true, message: "Review added" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // 🔒 Already reviewed check
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed)
      return res.status(400).json({ message: "You already reviewed this product" });

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ success: true, message: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


