// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)

Products.belongsTo(Categories, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

Categories.hasMany(Products, {
  foreignKey: 'cagegory_id',
});

Products.belongsToMany(Tags, {
  foreignKey: 'product_id',
});

Tags.belongsToMany(Products, {
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
