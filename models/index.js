// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
Products.belongsTo(Categories, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

Categories.hasMany(Products, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

Products.belongsToMany(Tags, {
  foreignKey: 'product_id',
});

Tags.belongsToMany(Products, {
  foreignKey: 'tag_id',
});
// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
