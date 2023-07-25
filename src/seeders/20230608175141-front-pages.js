'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('front_pages', [
      {
        id: 1,
        url: "login",
        localeSeoId: 6,
        structure: JSON.stringify(
          {
            page: {
              head: {
                scripts: {
                  libraries: [
                    {
                      name: 'axios',
                      path: 'node_modules/axios/dist/axios.js'
                    },
                    {
                      name: 'bowser',
                      path: 'node_modules/bowser/bundled.js'
                    }
                  ],
                  preloadComponents: [
                    {
                      name: 'tracking-component'
                    }
                  ]
                }
              },
              body: {
                style: {
                  backgroundColor: '#2a4cbb',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 auto',
                  minHeight: '100vh',
                  width: '100%',
                  fontFamily: 'Arial, sans-serif'
                }
              },
              main: {
                style: {
                  height: '100vh',
                  width: '100%'
                },
                rows: [
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      height: '100%',
                      justifyContent: 'center',
                      margin: '0 auto',
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'title-component',
                        title: 'Login'
                      },
                      {
                        name: 'login-form-component',
                        method: 'POST',
                        endpoint: 'auth/users/signin',
                      }
                    ]
                  }
                ]
              },
              footer: {
                style: {
                }
              }
            },
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pages', null, {});
  }
};
