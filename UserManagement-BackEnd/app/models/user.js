'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    password: DataTypes.STRING,
    hotel_id: DataTypes.INTEGER,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
 
  
  return User;
};