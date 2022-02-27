'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@example.com',
          password:
            '$2a$08$OfzRGp2mIMG5SbwZRvZfp.EXozR0bmFBDMPHwLSDoyiXbqAgj.6US', // secret
            gender: 'Male',
            
            mobile: '94771234656',
          
            address: 'Jaffna',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'User',
          email: 'user@example.com',
          password:
            '$2a$08$OfzRGp2mIMG5SbwZRvZfp.EXozR0bmFBDMPHwLSDoyiXbqAgj.6US', // secret
            gender: 'Female',
          
            mobile: '94771234656',
          
            address: 'Jaffna',
            created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
