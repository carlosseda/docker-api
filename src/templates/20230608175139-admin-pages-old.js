// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert('admin_pages', [
//       {
//         id: 1,
//         localeSeoId: 1,
//         url: "panel-de-control",
//         structure: JSON.stringify(
//           {
//             page: {
//               head: {
//                 scripts: {
//                   libraries: [
//                     {
//                       name: 'axios',
//                       path: 'node_modules/axios/dist/axios.js'
//                     },
//                     {
//                       name: 'bowser',
//                       path: 'node_modules/bowser/bundled.js'
//                     }
//                   ],
//                   preloadComponents: [
//                     {
//                       name: 'tracking-component'
//                     }
//                   ]
//                 }
//               },
//               body: {
//                 style: {
//                   backgroundColor: '#2a4cbb',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   fontFamily: 'Arial, sans-serif',
//                   margin: '0 auto',
//                   minHeight: '100vh',
//                   width: '100%'
//                 }
//               },
//               header : {
//                 style: {
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '10vh',
//                   justifyContent: 'center',
//                   padding: '0.5em 5%',
//                   width: '90%',
//                 },
//                 rows: [
//                   {
//                     style: {
//                       alignItems: 'center',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'title-component',
//                         title: 'OnePage'
//                       },
//                       {
//                         name: 'title-component',
//                         title:  'Panel de control'
//                       },
//                       {
//                         name: 'menu-component',
//                         method: 'GET',
//                         endpoint: 'menus/display/admin-header'
//                       }
//                     ]
//                   }
//                 ]
//               },
//               main: {
//                 style: {
//                   display: "flex",
//                   flexDirection: "column",
//                   margin: "0 auto",
//                   width: "90%"
//                 },
//                 rows: [
//                   {
//                     style: {
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'message-component',
//                       }
//                     ]
//                   },
//                   {
//                     style: {
//                       display: 'flex',
//                       flexWrap: "wrap",
//                       justifyContent: 'space-between',
//                       width: '100%'
//                     },
//                     columns: [
//                       {
//                         style: {
//                           minWidth: "30%",
//                           maxWidth: "30%"
//                         },
//                         name: 'admin-table-component',
//                         label: 'Errores 500',
//                         method: 'GET',
//                         endpoint: 'api-trackings/errors/500',
//                         pagination: true
//                       },
//                       {
//                         style: {
//                           minWidth: "30%",
//                           maxWidth: "30%"
//                         },
//                         name: 'admin-table-component',
//                         label: 'Errores 404',
//                         method: 'GET',
//                         endpoint: 'api-trackings/errors/404',
//                         pagination: true
//                       },
//                       {
//                         style: {
//                           minWidth: "30%",
//                           maxWidth: "30%"
//                         },
//                         name: 'admin-table-component',
//                         label: 'Latencias',
//                         method: 'GET',
//                         endpoint: 'page-trackings/latencies',  
//                         pagination: true                    
//                       }
//                     ]
//                   }
//                 ]
//               },
//               footer: {
//                 style: {
//                 }
//               }
//             },
//           }
//         ),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 2,
//         localeSeoId: 2,
//         url: "recursos-api",
//         structure: JSON.stringify(
//           {
//             page: {
//               head: {
//                 scripts: {
//                   libraries: [
//                     {
//                       name: 'axios',                      
//                       path: 'node_modules/axios/dist/axios.js'
//                     },
//                     {
//                       name: 'bowser',
//                       path: 'node_modules/bowser/bundled.js'
//                     } 
//                   ],
//                   preloadComponents: [
//                     {
//                       name: 'interface-editor-component'
//                     },
//                     {
//                       name: 'tracking-component'
//                     }
//                   ]
//                 }
//               },
//               body: {
//                 style: {
//                   backgroundColor: '#2a4cbb',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   fontFamily: 'Arial, sans-serif',
//                   margin: '0 auto',
//                   minHeight: '100vh',
//                   width: '100%'
//                 }
//               },
//               header : {
//                 style: {
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '10vh',
//                   justifyContent: 'center',
//                   padding: '0.5em 5%',
//                   width: '90%',
//                 },
//                 rows: [
//                   {
//                     style: {
//                       alignItems: 'center',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'title-component',
//                         title: 'OnePage'
//                       },
//                       {
//                         name: 'title-component',
//                         title:  'Recursos Api'
//                       },
//                       {
//                         name: 'menu-component',
//                         method: 'GET',
//                         endpoint: 'menus/display/admin-header'
//                       }
//                     ]
//                   }
//                 ]
//               },
//               main: {
//                 style: {
//                   display: "flex",
//                   flexDirection: "column",
//                   margin: "0 auto",
//                   width: "90%"
//                 },
//                 rows: [
//                   {
//                     style: {
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'overlayer-component',
//                       },
//                       {
//                         name: 'delete-element-modal-component',
//                       },
//                       {
//                         name: 'message-component',
//                       },
//                       {
//                         name: 'admin-filter-component',
//                         method: 'GET-QUERY',
//                         endpoint: 'api-resources'
//                       }
//                     ]
//                   },
//                   {
//                     style: {
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         style: {
//                           minWidth: "35%",
//                           maxWidth: "35%"
//                         },
//                         name: 'admin-table-component',  
//                         label: 'Recursos API', 
//                         method: 'GET',
//                         endpoint: 'api-resources',
//                         pagination: true
//                       },
//                       {
//                         style: {
//                           minWidth: "60%",
//                           maxWidth: "60%"
//                         },
//                         name: 'admin-form-component',
//                         method: 'POST',
//                         endpoint: 'api-resources',
//                         rows: [
//                           {
//                             style: {
//                               display: 'flex',
//                               gap: '2%',
//                               justifyContent: 'space-between',
//                               width: '100%',
//                             },
//                             columns: [
//                               {
//                                 dependant: true,
//                                 style: {
//                                   minWidth: "48%",
//                                   maxWidth: "48%"
//                                 },
//                                 name: 'admin-table-component',
//                                 label: 'Componentes consumidores',
//                                 method: 'GET',
//                                 endpoint: 'admin-components',
//                                 pagination: true
//                               },
//                               {
//                                 dependant: true,
//                                 style: {
//                                   minWidth: "48%",
//                                   maxWidth: "48%"
//                                 },
//                                 name: 'admin-form-component',
//                                 method: 'POST',
//                                 endpoint: 'admin-components'
//                               }
//                             ]
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               },
//               footer: {
//                 style: {
//                 }
//               }
//             },
//           }
//         ),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 3,
//         localeSeoId: 3,
//         url: "usuarios",
//         structure: JSON.stringify(
//           {
//             page: {
//               head: {
//                 scripts: {
//                   libraries: [
//                     {
//                       name: 'axios',
//                       path: 'node_modules/axios/dist/axios.js'
//                     },
//                     {
//                       name: 'bowser',
//                       path: 'node_modules/bowser/bundled.js'
//                     }
//                   ],
//                   preloadComponents: [
//                     {
//                       name: 'tracking-component'
//                     },
//                     {
//                       name: 'upload-image-button-component'
//                     },
//                     {
//                       name: 'image-gallery-component'
//                     }
//                   ]
//                 }
//               },
//               body: {
//                 style: {
//                   backgroundColor: '#2a4cbb',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   fontFamily: 'Arial, sans-serif',
//                   margin: '0 auto',
//                   minHeight: '100vh',
//                   width: '100%'
//                 }
//               },
//               header : {
//                 style: {
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '10vh',
//                   justifyContent: 'center',
//                   padding: '0.5em 5%',
//                   width: '90%',
//                 },
//                 rows: [
//                   {
//                     style: {
//                       alignItems: 'center',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'title-component',
//                         title: 'OnePage'
//                       },
//                       {
//                         name: 'title-component',
//                         title: 'Usuarios'
//                       },
//                       {
//                         name: 'menu-component',
//                         method: 'GET',
//                         endpoint: 'menus/display/admin-header'
//                       }
//                     ]
//                   }
//                 ]
//               },
//               main: {
//                 style: {
//                   display: "flex",
//                   flexDirection: "column",
//                   margin: "0 auto",
//                   width: "90%"
//                 },
//                 rows: [
//                   {
//                     style: {
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'overlayer-component',
//                       },
//                       {
//                         name: 'delete-element-modal-component',
//                       },
//                       {
//                         name: 'message-component',
//                       },
//                       {
//                         name: 'admin-filter-component',
//                         method: 'GET-QUERY',
//                         endpoint: 'users'
//                       }
//                     ]
//                   },
//                   {
//                     style: {
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       width: '100%'
//                     },
//                     columns: [
//                       {
//                         style: {
//                           minWidth: "35%",
//                           maxWidth: "35%"
//                         },
//                         name: 'admin-table-component',  
//                         label: 'Usuarios',
//                         method: 'GET',
//                         endpoint: 'users',
//                         filter: true,
//                         pagination: true
//                       },
//                       {
//                         style: {
//                           minWidth: "60%",
//                           maxWidth: "60%"
//                         },
//                         name: 'admin-form-component',
//                         method: 'POST',
//                         endpoint: 'users'
//                       }
//                     ]
//                   }
//                 ]
//               },
//               footer: {
//                 style: {
//                 }
//               }
//             },
//           }
//         ),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 4,
//         localeSeoId: 4,
//         url: "menus",
//         structure: JSON.stringify(
//           {
//             page: {
//               head: {
//                 scripts: {
//                   libraries: [
//                     {
//                       name: 'axios',
//                       path: 'node_modules/axios/dist/axios.js'
//                     },
//                     {
//                       name: 'bowser',
//                       path: 'node_modules/bowser/bundled.js'
//                     },
//                     {
//                       name: 'sortablejs',
//                       path: 'node_modules/sortablejs/Sortable.min.js'
//                     }
//                   ],
//                   preloadComponents: [
//                     {
//                       name: 'tracking-component'
//                     }
//                   ]
//                 }
//               },
//               body: {
//                 style: {
//                   backgroundColor: '#2a4cbb',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   fontFamily: 'Arial, sans-serif',
//                   margin: '0 auto',
//                   minHeight: '100vh',
//                   width: '100%'
//                 }
//               },
//               header : {
//                 style: {
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '10vh',
//                   justifyContent: 'center',
//                   padding: '0.5em 5%',
//                   width: '90%',
//                 },
//                 rows: [
//                   {
//                     style: {
//                       alignItems: 'center',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'title-component',
//                         title: 'OnePage'
//                       },
//                       {
//                         name: 'title-component',
//                         title: 'Menus'
//                       },
//                       {
//                         name: 'menu-component',
//                         method: 'GET',
//                         endpoint: 'menus/display/admin-header'
//                       }
//                     ]
//                   }
//                 ] 
//               },
//               main: {
//                 style: {
//                   display: "flex",
//                   flexDirection: "column",
//                   margin: "0 auto",
//                   width: "90%"
//                 },
//                 rows: [
//                   {
//                     style: {
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'overlayer-component',
//                       },
//                       {
//                         name: 'delete-element-modal-component',
//                       },
//                       {
//                         name: 'message-component',
//                       },
//                       {
//                         name: 'admin-filter-component',
//                         method: 'GET-QUERY',
//                         endpoint: 'menus'
//                       }
//                     ]
//                   },
//                   {
//                     style: {
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         style: {
//                           minWidth: "35%",
//                           maxWidth: "35%"
//                         },
//                         name: 'admin-table-component',
//                         label: 'Menus',
//                         method: 'GET',
//                         endpoint: 'menus',
//                         pagination: true
//                       },
//                       {
//                         style: {
//                           minWidth: "60%",
//                           maxWidth: "60%"
//                         },
//                         name: 'admin-form-component',
//                         method: 'POST',
//                         endpoint: 'menus',
//                         rows: [
//                           {
//                             style: {
//                               display: 'flex',
//                               gap: '2%',
//                               justifyContent: 'space-between',
//                               width: '100%',
//                             },
//                             columns: [
//                               {
//                                 dependant: true,
//                                 style: {
//                                   minWidth: "48%",
//                                   maxWidth: "48%"
//                                 },
//                                 name: 'admin-table-component',
//                                 label: 'Elementos de menú',
//                                 method: 'GET',
//                                 sortableLevels: '-1',
//                                 endpoint: 'menu-items',
//                               },
//                               {
//                                 dependant: true,
//                                 style: {
//                                   minWidth: "48%",
//                                   maxWidth: "48%"
//                                 },
//                                 name: 'admin-form-component',
//                                 method: 'POST',
//                                 endpoint: 'menu-items'
//                               }
//                             ]
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               },
//               footer: {
//                 style: {
//                 }
//               }
//             },
//           }
//         ),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 5,
//         localeSeoId: 5,
//         url: "seo",
//         structure: JSON.stringify(
//           {
//             page: {
//               head: {
//                 scripts: {
//                   libraries: [
//                     {
//                       name: 'axios',
//                       path: 'node_modules/axios/dist/axios.js'
//                     },
//                     {
//                       name: 'bowser',
//                       path: 'node_modules/bowser/bundled.js'
//                     }
//                   ],
//                   preloadComponents: [
//                     {
//                       name: 'tracking-component'
//                     }
//                   ]
//                 }
//               },
//               body: {
//                 style: {
//                   backgroundColor: '#2a4cbb',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   fontFamily: 'Arial, sans-serif',
//                   margin: '0 auto',
//                   minHeight: '100vh',
//                   width: '100%'
//                 }
//               },
//               header : {
//                 style: {
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '10vh',
//                   justifyContent: 'center',
//                   padding: '0.5em 5%',
//                   width: '90%',
//                 },
//                 rows: [
//                   {
//                     style: {
//                       alignItems: 'center',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'title-component',
//                         title: 'OnePage'
//                       },
//                       {
//                         name: 'title-component',
//                         title: 'SEO'
//                       },
//                       {
//                         name: 'menu-component',
//                         method: 'GET',
//                         endpoint: 'menus/display/admin-header'
//                       }
//                     ]
//                   }
//                 ]
//               },
//               main: {
//                 style: {
//                   display: "flex",
//                   flexDirection: "column",
//                   margin: "0 auto",
//                   width: "90%"
//                 },
//                 rows: [
//                   {
//                     style: {
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         name: 'overlayer-component',
//                       },
//                       {
//                         name: 'delete-element-modal-component',
//                       },
//                       {
//                         name: 'message-component',
//                       },
//                       {
//                         name: 'admin-filter-component',
//                         method: 'GET-QUERY',
//                         endpoint: 'locale-seos'
//                       }
//                     ]
//                   },
//                   {
//                     style: {
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     },
//                     columns: [
//                       {
//                         style: {
//                           minWidth: "35%",
//                           maxWidth: "35%"
//                         },
//                         name: 'admin-table-component',
//                         label: 'Enlaces estáticos',
//                         method: 'GET',
//                         endpoint: 'locale-seos',
//                         pagination: true
//                       },
//                       {
//                         style: {
//                           minWidth: "60%",
//                           maxWidth: "60%"
//                         },
//                         name: 'admin-form-component',
//                         method: 'POST',
//                         endpoint: 'locale-seos',
//                         rows: [
//                           {
//                             style: {
//                               display: 'flex',
//                               gap: '2%',
//                               justifyContent: 'space-between',
//                               width: '100%',
//                             },
//                             columns: [
//                               {
//                                 dependant: true,
//                                 style: {
//                                   minWidth: "48%",
//                                   maxWidth: "48%"
//                                 },
//                                 name: 'admin-table-component',
//                                 label: 'Enlaces dinámicos',
//                                 method: 'GET',
//                                 endpoint: 'locale-seo-slugs',
//                                 pagination: true
//                               },
//                               {
//                                 dependant: true,
//                                 style: {
//                                   minWidth: "48%",
//                                   maxWidth: "48%"
//                                 },
//                                 name: 'admin-form-component',
//                                 method: 'POST',
//                                 endpoint: 'locale-seo-slugs'
//                               }
//                             ]
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               },
//               footer: {
//                 style: {
//                 }
//               }
//             },
//           }
//         ),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('admin_pages', null, {});
//   }
// };
