'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('admin_pages', [
      {
        id: 1,
        localeSeoId: 1,
        url: "panel-de-control",
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
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 auto',
                  minHeight: '100vh',
                  width: '100%'
                }
              },
              header : {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10vh',
                  justifyContent: 'center',
                  padding: '0.5em 5%',
                  width: '90%',
                },
                rows: [
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'menu-component',
                        method: 'GET',
                        endpoint: 'menus/display/admin-header',
                        structure: {
                          label: 'Menu Principal'
                        }
                      }
                    ]
                  }
                ]
              },
              main: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  width: "90%"
                },
                rows: [
                  {
                    style: {
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'message-component',
                      }
                    ]
                  },
                  {
                    style: {
                      display: 'flex',
                      flexWrap: "wrap",
                      justifyContent: 'space-between',
                      width: '100%'
                    },
                    columns: [
                      {
                        style: {
                          minWidth: "30%",
                          maxWidth: "30%"
                        },
                        name: 'admin-table-component',
                        label: 'Errores 500',
                        method: 'GET',
                        endpoint: 'api-trackings/errors/500',
                        pagination: true,
                        structure: {
                          headers: {
                            resource: {
                              label: 'Nombre del recurso'
                            },
                            method: {
                              label: 'Método'
                            },
                            endTime: {
                              label: 'Fecha'
                            }
                          }
                        }
                      },
                      {
                        style: {
                          minWidth: "30%",
                          maxWidth: "30%"
                        },
                        name: 'admin-table-component',
                        label: 'Errores 404',
                        method: 'GET',
                        endpoint: 'api-trackings/errors/404',
                        pagination: true,
                        structure: {
                          headers: {
                            resource: {
                              label: 'Nombre del recurso'
                            },
                            method: {
                              label: 'Método'
                            },
                            endTime: {
                              label: 'Fecha'
                            }
                          }
                        }
                      },
                      {
                        style: {
                          minWidth: "30%",
                          maxWidth: "30%"
                        },
                        name: 'admin-table-component',
                        label: 'Latencias',
                        method: 'GET',
                        endpoint: 'page-trackings/latencies',  
                        pagination: true,
                        structure: {
                          headers: {
                            prefix: {
                              label: 'Sección'
                            },
                            url: {
                              label: 'Url'
                            },
                            averageLatency: {
                              label: 'Latencia'
                            }
                          }
                        }              
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
      },
      {
        id: 2,
        localeSeoId: 2,
        url: "recursos-api",
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
                      name: 'interface-editor-component'
                    },
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
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 auto',
                  minHeight: '100vh',
                  width: '100%'
                }
              },
              header : {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10vh',
                  justifyContent: 'center',
                  padding: '0.5em 5%',
                  width: '90%',
                },
                rows: [
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'menu-component',
                        method: 'GET',
                        endpoint: 'menus/display/admin-header',
                        structure: {
                          label: 'Menu Principal'
                        }
                      }
                    ]
                  }
                ]
              },
              main: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  width: "90%"
                },
                rows: [
                  {
                    style: {
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'overlayer-component',
                      },
                      {
                        name: 'delete-element-modal-component',
                      },
                      {
                        name: 'message-component',
                      },
                      {
                        name: 'admin-filter-component',
                        method: 'GET-QUERY',
                        endpoint: 'api-resources'
                      }
                    ]
                  },
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    },
                    columns: [
                      {
                        style: {
                          minWidth: "35%",
                          maxWidth: "35%"
                        },
                        name: 'admin-table-component',  
                        label: 'Recursos API', 
                        method: 'GET',
                        endpoint: 'api-resources',
                        pagination: true,
                        structure: {
                          headers: {
                            name: {
                              label: 'Nombre del recurso'
                            },
                            tableName: {
                              label: 'Nombre de la tabla'
                            },
                          },
                          buttons: {
                            edit: true,
                            remove: true
                          }
                        }
                      },
                      {
                        style: {
                          minWidth: "60%",
                          maxWidth: "60%"
                        },
                        name: 'admin-form-component',
                        method: 'POST',
                        endpoint: 'api-resources',
                        structure: {
                          tabs: {
                            main: {
                              label: 'Principal'
                            }
                          },
                
                          tabsContent: {
                            main: {
                              rows: {
                                row1: {
                                  formElements: {
                                    id: {
                                      element: 'input',
                                      type: 'hidden'
                                    },
                                    name: {
                                      label: 'Nombre del recurso',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'Nombre que aparecerá en el menú',
                                      validate: ['required']
                                    },
                                    tableName: {
                                      label: 'Nombre de la tabla',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'Nombre separado por barras bajas',
                                      validate: ['required']
                                    },
                                    interface: {
                                      label: 'Crear panel de administración',
                                      element: 'select',
                                      required: true,
                                      options: [
                                        { value: true, label: 'Sí' },
                                        { value: false, label: 'No' }
                                      ]
                                    }
                                  }
                                },
                                row2: {
                                  formElements: {
                                    tableDefinition: {
                                      label: 'Descripción de la tabla',
                                      element: 'textarea',
                                      validate: ['required'],
                                      placeholder: 'Ej: La tabla tendrá los campos: id, workerId, name (not null), email (unique notnull). Indices en email y en la clave foranea',
                                    },
                                    modelDefinition: {
                                      label: 'Descripción del modelo',
                                      element: 'textarea',
                                      validate: ['required'],
                                      placeholder: 'Ej: Añade la relación de hasMany con menuItems y de belongsToMany con LocaleSeo y LocaleSeoSlug a través de MenuItem.',
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        rows: [
                          {
                            style: {
                              display: 'flex',
                              gap: '2%',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            columns: [
                              {
                                dependant: true,
                                style: {
                                  minWidth: "48%",
                                  maxWidth: "48%"
                                },
                                name: 'admin-table-component',
                                label: 'Componentes consumidores',
                                method: 'GET',
                                endpoint: 'admin-components',
                                pagination: true,
                                structure: {
                                  headers: {
                                    name: {
                                      label: 'Elemento'
                                    }
                                  },
                                  buttons: {
                                    edit: true,
                                    remove: true
                                  }
                                }
                              },
                              {
                                dependant: true,
                                style: {
                                  minWidth: "48%",
                                  maxWidth: "48%"
                                },
                                name: 'admin-form-component',
                                method: 'POST',
                                endpoint: 'admin-components',
                                structure: {
                                  tabs: {
                                    main: {
                                      label: 'Nuevo elemento de Administración'
                                    }
                                  },
                        
                                  tabsContent: {
                                    main: {
                                      rows: {
                                        row1: {
                                          formElements: {
                                            id: {
                                              element: 'input',
                                              type: 'hidden'
                                            },
                                            apiResourceId: {
                                              element: 'input',
                                              type: 'hidden'
                                            },
                                            element: {
                                              label: 'Elemento',
                                              element: 'select',
                                              required: true,
                                              options: [
                                                { value: 'form', label: 'Formulario' },
                                                { value: 'table', label: 'Tabla' },
                                                { value: 'filter', label: 'Filtro' }
                                              ]
                                            }
                                          }
                                        },
                                        row2: {
                                          formElements: {
                                            structure: {
                                              interfaceEditor: true,
                                              label: 'Estructura',
                                              element: 'textarea',
                                              required: true
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        ]
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
      },
      {
        id: 3,
        localeSeoId: 3,
        url: "usuarios",
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
                    },
                    {
                      name: 'upload-image-button-component'
                    },
                    {
                      name: 'image-gallery-component'
                    }
                  ]
                }
              },
              body: {
                style: {
                  backgroundColor: '#2a4cbb',
                  display: 'flex',
                  flexDirection: 'column',
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 auto',
                  minHeight: '100vh',
                  width: '100%'
                }
              },
              header : {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10vh',
                  justifyContent: 'center',
                  padding: '0.5em 5%',
                  width: '90%',
                },
                rows: [
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'menu-component',
                        method: 'GET',
                        endpoint: 'menus/display/admin-header',
                        structure: {
                          label: 'Menu Principal'
                        }
                      }
                    ]
                  }
                ]
              },
              main: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  width: "90%"
                },
                rows: [
                  {
                    style: {
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'overlayer-component',
                      },
                      {
                        name: 'delete-element-modal-component',
                      },
                      {
                        name: 'message-component',
                      }
                    ]
                  },
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%'
                    },
                    columns: [
                      {
                        style: {
                          minWidth: "35%",
                          maxWidth: "35%"
                        },
                        name: 'admin-table-component',  
                        label: 'Usuarios',
                        method: 'GET',
                        endpoint: 'users',
                        filter: true,
                        pagination: true,
                        structure: {
                          headers: {
                            name: {
                              label: 'Nombre'
                            },
                            email: {
                              label: 'Email'
                            },
                          },
                          buttons: {
                            edit: true,
                            remove: true
                          }
                        }      
                      },
                      {
                        style: {
                          minWidth: "60%",
                          maxWidth: "60%"
                        },
                        name: 'admin-form-component',
                        method: 'POST',
                        endpoint: 'users',
                        structure: {
                          tabs: {
                            main: {
                              label: 'Principal'
                            },
                            images: {
                              label: 'Imágenes'
                            }
                          },
                          tabsContent: {
                            main: {
                              rows: {
                                row1: {
                                  formElements: {
                                    id: {
                                      element: 'input',
                                      type: 'hidden'
                                    },
                                    name: {
                                      label: 'Nombre',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'Nombre del usuario',
                                      validate: ['required']
                                    },
                                    email: {
                                      label: 'Email',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'Email del usuario',
                                      validate: ['required', 'email']
                                    }
                                  }
                                },
                                row2: {
                                  formElements: {
                                    password: {
                                      label: 'Contraseña',
                                      element: 'input',
                                      type: 'password',
                                      placeholder: 'Contraseña del usuario',
                                    },
                                    repeatPassword: {
                                      label: 'Repetir contraseña',
                                      element: 'input',
                                      type: 'password',
                                      placeholder: 'Contraseña del usuario',
                                    },
                                  }
                                }
                              }
                            },
                            images: {
                              rows: {
                                row1: {
                                  formElements: {
                                    avatar: {
                                      label: 'Imagen de perfil',
                                      element: 'input',
                                      type: 'image',
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
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
      },
      {
        id: 4,
        localeSeoId: 4,
        url: "menus",
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
                    },
                    {
                      name: 'sortablejs',
                      path: 'node_modules/sortablejs/Sortable.min.js'
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
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 auto',
                  minHeight: '100vh',
                  width: '100%'
                }
              },
              header : {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10vh',
                  justifyContent: 'center',
                  padding: '0.5em 5%',
                  width: '90%',
                },
                rows: [
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'menu-component',
                        method: 'GET',
                        endpoint: 'menus/display/admin-header',
                        structure: {
                          label: 'Menu Principal'
                        }
                      }
                    ]
                  }
                ] 
              },
              main: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  width: "90%"
                },
                rows: [
                  {
                    style: {
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'overlayer-component',
                      },
                      {
                        name: 'delete-element-modal-component',
                      },
                      {
                        name: 'message-component',
                      },
                      {
                        name: 'admin-filter-component',
                        method: 'GET-QUERY',
                        endpoint: 'menus'
                      }
                    ]
                  },
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    },
                    columns: [
                      {
                        style: {
                          minWidth: "35%",
                          maxWidth: "35%"
                        },
                        name: 'admin-table-component',
                        label: 'Menus',
                        method: 'GET',
                        endpoint: 'menus',
                        pagination: true,
                        structure: {
                          headers: {
                            name: {
                              label: 'Nombre del menu'
                            }
                          },
                          buttons: {
                            edit: true,
                            remove: true
                          }
                        }
                      },
                      {
                        style: {
                          minWidth: "60%",
                          maxWidth: "60%"
                        },
                        name: 'admin-form-component',
                        method: 'POST',
                        endpoint: 'menus',
                        structure: {
                          tabs: {
                            main: {
                              label: 'Principal'
                            }
                          },
                
                          tabsContent: {
                            main: {
                              rows: {
                                row1: {
                                  formElements: {
                                    id: {
                                      element: 'input',
                                      type: 'hidden'
                                    },
                                    name: {
                                      label: 'Nombre del menu',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'Nombre que tendrá el recurso',
                                      validate: ['required']
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        rows: [
                          {
                            style: {
                              display: 'flex',
                              gap: '2%',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            columns: [
                              {
                                dependant: true,
                                style: {
                                  minWidth: "48%",
                                  maxWidth: "48%"
                                },
                                name: 'admin-table-component',
                                label: 'Elementos de menú',
                                method: 'GET',
                                sortableLevels: '-1',
                                endpoint: 'menu-items',
                                structure: {
                                  headers: {
                                    name: {
                                      label: 'Nombre del enlace'
                                    }
                                  },
                                  buttons: {
                                    edit: true,
                                    remove: true
                                  }
                                }
                              },
                              {
                                dependant: true,
                                style: {
                                  minWidth: "48%",
                                  maxWidth: "48%"
                                },
                                name: 'admin-form-component',
                                method: 'POST',
                                endpoint: 'menu-items',
                                structure: {
                                  tabs: {
                                    main: {
                                      label: 'Nuevo enlace del Menú'
                                    }
                                  },
                        
                                  tabsContent: {
                                    main: {
                                      rows: {
                                        row1: {
                                          formElements: {
                                            id: {
                                              element: 'input',
                                              type: 'hidden'
                                            },
                                          }
                                        },
                                        row2: {
                                          formElements: {
                                            menuId: {
                                              element: 'input',
                                              type: 'hidden'
                                            },
                                          }
                                        },
                                        row3: {
                                          formElements: {
                                            private: {
                                              label: 'Visible solo para usuarios administradores',
                                              element: 'select',
                                              required: true,
                                              options: [
                                                { value: true, label: 'Sí' },
                                                { value: false, label: 'No' }
                                              ]
                                            }
                                          }
                                        },
                                        row4: {
                                          formElements: {
                                            link: {
                                              label: 'Tipo de enlace',
                                              element: 'select',
                                              required: true,
                                              selectRelated: true,
                                              options: [
                                                { value: 'customUrl', label: 'Enlace personalizado'},
                                                { value: 'localeSeoId', label: 'Enlace estático', selected: true },
                                                { value: 'localeSeoSlugId', label: 'Enlace dinámico' }
                                              ]
                                            }
                                          }
                                        },
                                        row5: {
                                          formElements: {
                                            localeSeoId: {
                                              label: 'Enlace estático',
                                              element: 'select',
                                              endpoint: 'locale-seos',
                                              related: 'link',
                                              relatedActive: true
                                            }
                                          }
                                        },
                                        row6: {
                                          formElements: {
                                            localeSeoSlugId: {
                                              label: 'Enlace dinámico',
                                              element: 'select',
                                              endpoint: 'locale-seo-slugs',
                                              related: 'link',
                                              relatedActive: false
                                            }
                                          }
                                        },
                                        row7: {
                                          formElements: {
                                            customUrl: {
                                              label: 'Enlace personalizado',
                                              element: 'input',
                                              type: 'text',
                                              placeholder: 'Ejemplo: https://www.google.com',
                                              related: 'link',
                                              relatedActive: false
                                            }
                                          }
                                        },
                                        locale : {
                                          rows: {
                                            row8: {
                                              formElements: {
                                                name: {
                                                  label: 'Nombre del enlace',
                                                  element: 'input',
                                                  type: 'text',
                                                  placeholder: ''
                                                },
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        ]
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
      },
      {
        id: 5,
        localeSeoId: 5,
        url: "seo",
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
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 auto',
                  minHeight: '100vh',
                  width: '100%'
                }
              },
              header : {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10vh',
                  justifyContent: 'center',
                  padding: '0.5em 5%',
                  width: '90%',
                },
                rows: [
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'menu-component',
                        method: 'GET',
                        endpoint: 'menus/display/admin-header',
                        structure: {
                          label: 'Menu Principal'
                        }
                      }
                    ]
                  }
                ]
              },
              main: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  width: "90%"
                },
                rows: [
                  {
                    style: {
                      width: '100%',
                    },
                    columns: [
                      {
                        name: 'overlayer-component',
                      },
                      {
                        name: 'delete-element-modal-component',
                      },
                      {
                        name: 'message-component',
                      },
                      {
                        name: 'admin-filter-component',
                        method: 'GET-QUERY',
                        endpoint: 'locale-seos'
                      }
                    ]
                  },
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    },
                    columns: [
                      {
                        style: {
                          minWidth: "35%",
                          maxWidth: "35%"
                        },
                        name: 'admin-table-component',
                        label: 'Enlaces estáticos',
                        method: 'GET',
                        endpoint: 'locale-seos',
                        pagination: true,
                        structure: JSON.stringify(
                          {
                            headers: {
                              prefix: {
                                label: 'Sección'
                              },
                              languageAlias: {
                                label: 'Idioma'
                              },
                              url: {
                                label: 'Url'
                              },
                              title: {
                                label: 'Título'
                              }
                            },
                            buttons: {
                              edit: true,
                              remove: true
                            }
                          }
                        )
                      },
                      {
                        style: {
                          minWidth: "60%",
                          maxWidth: "60%"
                        },
                        name: 'admin-form-component',
                        method: 'POST',
                        endpoint: 'locale-seos',
                        structure: {
                          tabs: {
                            main: {
                              label: 'Principal'
                            }
                          },
                
                          tabsContent: {
                            main: {
                              rows: {
                                row1: {
                                  formElements: {
                                    id: {
                                      element: 'input',
                                      type: 'hidden'
                                    },
                                    languageAlias: {
                                      label: 'Idioma',
                                      element: 'select',
                                      required: true,
                                      endpoint: 'languages',
                                      value: 'alias'
                                    },
                                    prefix: {
                                      label: 'Sección',
                                      element: 'select',
                                      required: true,
                                      options: [
                                        {
                                          'label': 'Panel de administración',
                                          'value': 'admin'
                                        },
                                        {
                                          'label': 'Frontend',
                                          'value': 'front'
                                        }
                                      ]
                                    },
                                    url: {
                                      label: 'Url del enlace estático',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'sin barra delante ej: contacto',
                                      validate: ['required']
                                    },
                                    menu: {
                                      label: 'Puede añadirse al menú',
                                      element: 'select',
                                      required: true,
                                      options: [
                                        {
                                          'label': 'Sí',
                                          'value': true
                                        },
                                        {
                                          'label': 'No',
                                          'value': false
                                        }
                                      ]
                                    }
                                  }
                                },
                                row2: {
                                  formElements: {
                                    title: {
                                      label: 'Título de la página',
                                      element: 'input',
                                      type: 'text',
                                      maxLength: 65,
                                      placeholder: 'Título para SEO',
                                      validate: ['required']
                                    },
                                    keywords: {
                                      label: 'Keywords de la página',
                                      element: 'input',
                                      type: 'text',
                                      placeholder: 'Separar con comas'
                                    }
                                  }
                                },
                                row3: {
                                  formElements: {
                                    description: {
                                      label: 'Descripción de la página',
                                      element: 'textarea',
                                      maxLength: 120,
                                      placeholder: 'meta description para SEO'
                                    }
                                  }
                                },
                                row4: {
                                  formElements: {
                                    sitemap: {
                                      label: 'Agregar a sitemap.xml',
                                      element: 'select',
                                      required: true,
                                      options: [
                                        {
                                          'label': 'Sí',
                                          'value': true
                                        },
                                        {
                                          'label': 'No',
                                          'value': false
                                        }
                                      ]
                                    },
                                    priority: {
                                      label: 'Prioridad en sitemap.xml',
                                      element: 'select',
                                      options: [
                                        {
                                          'label': '0.1',
                                          'value': 0.1
                                        },
                                        {
                                          'label': '0.2',
                                          'value': 0.2
                                        },
                                        {
                                          'label': '0.3',
                                          'value': 0.3
                                        },
                                        {
                                          'label': '0.4',
                                          'value': 0.4
                                        },
                                        {
                                          'label': '0.5',
                                          'value': 0.5
                                        },
                                        {
                                          'label': '0.6',
                                          'value': 0.6
                                        },
                                        {
                                          'label': '0.7',
                                          'value': 0.7
                                        },
                                        {
                                          'label': '0.8',
                                          'value': 0.8
                                        },
                                        {
                                          'label': '0.9',
                                          'value': 0.9
                                        },
                                        {
                                          'label': '1.0',
                                          'value': 1.0
                                        }
                                      ]
                                    },
                                    changeFrequency: {
                                      label: 'Frecuencia de cambio en sitemap.xml',
                                      element: 'select',
                                      options: [
                                        {
                                          'label': 'always',
                                          'value': 'always'
                                        },
                                        {
                                          'label': 'hourly',
                                          'value': 'hourly'
                                        },
                                        {
                                          'label': 'daily',
                                          'value': 'daily'
                                        },
                                        {
                                          'label': 'weekly',
                                          'value': 'weekly'
                                        },
                                        {
                                          'label': 'monthly',
                                          'value': 'monthly'
                                        },
                                        {
                                          'label': 'yearly',
                                          'value': 'yearly'
                                        },
                                        {
                                          'label': 'never',
                                          'value': 'never'
                                        }
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        rows: [
                          {
                            style: {
                              display: 'flex',
                              gap: '2%',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            columns: [
                              {
                                dependant: true,
                                style: {
                                  minWidth: "48%",
                                  maxWidth: "48%"
                                },
                                name: 'admin-table-component',
                                label: 'Enlaces dinámicos',
                                method: 'GET',
                                endpoint: 'locale-seo-slugs',
                                pagination: true,
                                structure: {
                                  headers: {
                                    slug: {
                                      label: 'Fragmento de la url'
                                    },
                                    parentSlug: {
                                      label: 'Fragmento padre'
                                    },
                                    title: {
                                      label: 'Título de la página'
                                    }
                                  },
                                  buttons: {
                                    edit: true,
                                    remove: true
                                  }
                                }
                              },
                              {
                                dependant: true,
                                style: {
                                  minWidth: "48%",
                                  maxWidth: "48%"
                                },
                                name: 'admin-form-component',
                                method: 'POST',
                                endpoint: 'locale-seo-slugs',
                                structure: {
                                  tabs: {
                                    main: {
                                      label: 'Enlaces dinámicos'
                                    }
                                  },
                                  tabsContent: {
                                    main: {
                                      rows: {
                                        row1: {
                                          formElements: {
                                            id: {
                                              element: 'input',
                                              type: 'hidden'
                                            },
                                          }
                                        },
                                        row2: {
                                          formElements: {
                                            localeSeoId: {
                                              element: 'input',
                                              type: 'hidden'
                                            },
                                          }
                                        },
                                        row3: {
                                          formElements: {
                                            slug: {
                                              label: 'Fragmento de la url',
                                              element: 'input',
                                              type: 'text',
                                              required: true,
                                              placeholder: 'ej: contacto',
                                            },
                                            parentSlug: {
                                              label: 'Fragmento padre',
                                              element: 'select',
                                              endpoint: 'locale-seo-slugs',
                                              options: [
                                                {
                                                  'label': 'Ninguno',
                                                  'value': null
                                                }
                                              ]
                                            },
                                          }
                                        },
                                        row4: {
                                          formElements: {
                                            title: {
                                              label: 'Título de la página',
                                              element: 'input',
                                              type: 'text',
                                              maxLength: 65,
                                              placeholder: 'Título para SEO',
                                              validate: ['required']
                                            },
                                            keywords: {
                                              label: 'Keywords de la página',
                                              element: 'input',
                                              type: 'text',
                                              maxLength: 65,
                                              placeholder: 'Separar con comas'
                                            }
                                          }
                                        },
                                        row5: {
                                          formElements: {
                                            description: {
                                              label: 'Descripción de la página',
                                              element: 'textarea',
                                              maxLength: 120,
                                              placeholder: 'meta description para SEO'
                                            }
                                          }
                                        } 
                                      }
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        ]
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
    await queryInterface.bulkDelete('admin_pages', null, {});
  }
};
