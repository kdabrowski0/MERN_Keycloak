const Shoe = require("../models/Shoe");
const asyncHandler = require("express-async-handler");

const getAllShoes = asyncHandler(async (req, res) => {
  let shoes;
  if (req.query.shoeName) {
    const pattern = new RegExp(req.query.shoeName, "i");
    shoes = await Shoe.aggregate([{ $match: { shoeName: pattern } }]).exec();
  } else {
    shoes = await Shoe.find().lean();
  }

  if (!shoes?.length) {
    return res.status(200).json([]);
  }

  res.json(shoes);
});

const createNewShoe = asyncHandler(async (req, res) => {
  const { shoeName, designer, price, img_url, release_date, collaboration } =
    req.body;

  if (
    !shoeName ||
    !designer ||
    !price ||
    !img_url ||
    !release_date ||
    !collaboration
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const shoe = await Shoe.create({
    shoeName,
    designer,
    price,
    img_url,
    release_date,
    collaboration,
  });

  if (shoe) {
    return res.status(201).json({ message: "New shoe created" });
  } else {
    return res.status(400).json({ message: "Invalid shoe data received" });
  }
});

const updateShoe = asyncHandler(async (req, res) => {
  const {
    id,
    shoeName,
    designer,
    price,
    release_date,
    img_url,
    collaboration,
  } = req.body;

  if (
    !id ||
    !shoeName ||
    !designer ||
    !price ||
    !release_date ||
    !img_url ||
    !collaboration
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const shoe = await Shoe.findById(id).exec();

  if (!shoe) {
    return res.status(400).json({ message: "Shoe not found" });
  }

  shoe.shoeName = shoeName;
  shoe.designer = designer;
  shoe.price = price;
  shoe.release_date = release_date;
  shoe.img_url = img_url;
  shoe.collaboration = collaboration;

  const updatedShoe = await shoe.save();

  res.json(`'${updatedShoe.shoeName}' updated`);
});

const deleteShoe = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Shoe ID required" });
  }

  const shoe = await Shoe.findById(id).exec();

  if (!shoe) {
    return res.status(400).json({ message: "Shoe not found" });
  }

  const result = await shoe.deleteOne();

  const reply = `Shoe '${result.shoeName}' with ID ${result._id} deleted`;

  res.json(reply);
});


const countShoesWithPriceOver100 = asyncHandler(async (req, res) => {
  const count = await Shoe.aggregate([
    {
      $match: {
        price: {
          $gt: 100,
        },
      },
    },
    {
      $count: "total",
    },
  ]);
  res.json({ count: count[0].total });
});

const countShoes = asyncHandler(async (req, res) => {
  const count = await Shoe.countDocuments();
  res.json({ count });
});

const averagePrice = asyncHandler(async (req, res) => {
  const average = await Shoe.aggregate([
    { $group: { _id: null, avg: { $avg: "$price" } } },
  ]);
  res.json({ average: average[0].avg });
});

const countShoesWithCollaboration = asyncHandler(async (req, res) => {
  const shoesCount = await Shoe.aggregate([
    {
      $match: {
        collaboration: "yes",
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({ count: shoesCount[0].count });
});

const countShoesWithoutCollaboration = asyncHandler(async (req, res) => {
  const shoesCount = await Shoe.aggregate([
    {
      $match: {
        collaboration: "no",
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({ count: shoesCount[0].count });
});

const ShoeWithHighestPrice = asyncHandler(async (req, res) => {
  const highestPriceShoe = await Shoe.aggregate([
    { $sort: { price: -1 } },
    { $limit: 1 },
    {
      $project: {
        shoeName: 1,
        price: 1,
        _id: 0,
      },
    },
  ]);
  if (!highestPriceShoe?.length) {
    return res.status(400).json({ message: "No shoes found" });
  }

  res.json(highestPriceShoe[0]);
});

const ShoeWithLowestPrice = asyncHandler(async (req, res) => {
  const lowestPriceShoe = await Shoe.aggregate([
    { $sort: { price: 1 } },
    { $limit: 1 },
    {
      $project: {
        shoeName: 1,
        price: 1,
        _id: 0,
      },
    },
  ]);
  if (!lowestPriceShoe?.length) {
    return res.status(400).json({ message: "No shoes found" });
  }

  res.json(lowestPriceShoe[0]);
});

const ShoeWithMostComments = asyncHandler(async (req, res) => {
  const shoeWithMostComments = await Shoe.aggregate([
    { $unwind: "$comments" },
    {
      $group: {
        _id: "$_id",
        shoeName: { $first: "$shoeName" },
        comments: { $sum: 1 },
      },
    },
    { $sort: { comments: -1 } },
    { $limit: 1 },
    {
      $project: {
        shoeName: 1,
        comments: 1,
        _id: 0,
      },
    },
  ]);
  if (!shoeWithMostComments?.length) {
    return res.status(400).json({ message: "No shoes found" });
  }

  res.json(shoeWithMostComments[0]);
});

const countComments = asyncHandler(async (req, res) => {
  const count = await Shoe.aggregate([
    {
      $unwind: "$comments",
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const totalComments = count.length ? count[0].count : 0;

  res.json(totalComments);
});

module.exports = {
  getAllShoes,
  createNewShoe,
  updateShoe,
  deleteShoe,
  countShoesWithPriceOver100,
  countShoes,
  countShoesWithCollaboration,
  countShoesWithoutCollaboration,
  averagePrice,
  ShoeWithHighestPrice,
  ShoeWithLowestPrice,
  ShoeWithMostComments,
  countComments,
};
