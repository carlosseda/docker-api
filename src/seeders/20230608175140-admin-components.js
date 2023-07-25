'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('admin_components', [
      {
        id: 1,
        apiResourceId: 8,
        adminPageId: 1,
        endpoint: 'api-trackings/errors/500',
        name: 'admin-table-component',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        apiResourceId: 8,
        adminPageId: 1,
        endpoint: 'api-trackings/errors/404',
        name: 'admin-table-component',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        apiResourceId: 9,
        adminPageId: 1,
        endpoint: 'page-trackings/latencies',
        name: 'admin-table-component',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        apiResourceId: 1,
        adminPageId: 2,
        name: 'admin-form-component',
        endpoint: 'api-resources',
        structure: JSON.stringify(
          {
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
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        apiResourceId: 1,
        adminPageId: 2,
        name: 'admin-table-component',
        endpoint: 'api-resources',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        apiResourceId: 1,
        adminPageId: 2,
        name: 'admin-filter-component',
        endpoint: 'api-resources',
        structure: JSON.stringify(
          {
            tabs: {
              filter: {
                label: 'Filtros de búsqueda'
              },
              openAI: {
                label: 'OpenAI'
              }
            },
            tabsContent: {
              filter: {
                rows: {
                  row1: {
                    formElements: {
                      name: {
                        label: 'Nombre del recurso',
                        element: 'input',
                        type: 'text',
                        placeholder: '',
                      },
                      tableName: {
                        label: 'Nombre de la tabla',
                        element: 'input',
                        type: 'text',
                        placeholder: ''
                      }
                    }
                  }
                }
              },
              openAI: {
                rows: {
                  row1: {
                    formElements: {
                      prompt: {
                        label: '¿Qué datos quieres ver?',
                        element: 'textarea'
                      }
                    }
                  }
                }
              }
            }
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        apiResourceId: 2,
        adminPageId: 2,
        name: 'admin-form-component',
        endpoint: 'admin-components',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        apiResourceId: 2,
        adminPageId: 2,
        name: 'admin-table-component',
        endpoint: 'admin-components',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        apiResourceId: 3,
        adminPageId: 4,
        name: 'admin-form-component',
        endpoint: 'menus',
        structure: JSON.stringify(
          {
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
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        apiResourceId: 3,
        adminPageId: 4,
        name: 'admin-table-component',
        endpoint: 'menus',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        apiResourceId: 3,
        adminPageId: 4,
        name: 'admin-filter-component',
        endpoint: 'menus',
        structure: JSON.stringify(
          {
            tabs: {
              filter: {
                label: 'Filtros de búsqueda'
              },
              openAI: {
                label: 'OpenAI'
              }
            },
            tabsContent: {
              filter: {
                rows: {
                  row1: {
                    formElements: {
                      name: {
                        label: 'Nombre del recurso',
                        element: 'input',
                        type: 'text',
                        placeholder: '',
                      }
                    }
                  }
                }
              },
              openAI: {
                rows: {
                  row1: {
                    formElements: {
                      prompt: {
                        label: '¿Qué datos quieres ver?',
                        element: 'textarea'
                      }
                    }
                  }
                }
              }
            }
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        apiResourceId: 4,
        adminPageId: 4,
        name: 'admin-form-component',
        endpoint: 'menu-items',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        apiResourceId: 4,
        adminPageId: 4,
        name: 'admin-table-component',
        endpoint: 'menu-items',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        apiResourceId: 5,
        adminPageId: 3,
        name: 'admin-form-component',
        endpoint: 'users',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        apiResourceId: 5,
        adminPageId: 3,
        name: 'admin-table-component',
        endpoint: 'users',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        apiResourceId: 5,
        adminPageId: 3,
        name: 'admin-filter-component',
        endpoint: 'users',
        structure: JSON.stringify(
          {
            tabs: {
              filter: {
                label: 'Filtros de búsqueda'
              },
              openAI: {
                label: 'OpenAI'
              }
            },
            tabsContent: {
              filter: {
                rows: {
                  row1: {
                    formElements: {
                      name: {
                        label: 'Nombre',
                        element: 'input',
                        type: 'text',
                        placeholder: '',
                      },
                      email: {
                        label: 'Email',
                        element: 'input',
                        type: 'text',
                        placeholder: ''
                      }
                    }
                  }
                }
              },
              openAI: {
                rows: {
                  row1: {
                    formElements: {
                      prompt: {
                        label: '¿Qué datos quieres ver?',
                        element: 'textarea'
                      }
                    }
                  }
                }
              }
            }
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        apiResourceId: 6,
        adminPageId: 5,
        name: 'admin-form-component',
        endpoint: 'locale-seos',
        structure: JSON.stringify(
          {
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
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        apiResourceId: 6,
        adminPageId: 5,
        name: 'admin-table-component',
        endpoint: 'locale-seos',
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        apiResourceId: 6,
        adminPageId: 5,
        name: 'admin-filter-component',
        endpoint: 'locale-seos',
        structure: JSON.stringify(
          {
            tabs: {
              filter: {
                label: 'Filtros de búsqueda'
              },
              openAI: {
                label: 'OpenAI'
              }
            },
            tabsContent: {
              filter: {
                rows: {
                  row1: {
                    formElements: {
                      prefix: {
                        label: 'Sección',
                        element: 'select',
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
                      languageAlias: {
                        label: 'Idioma',
                        element: 'select',
                        endpoint: 'languages',
                        value: 'alias'
                      },
                      url: {
                        label: 'Url del enlace estático',
                        element: 'input',
                        type: 'text',
                        placeholder: 'sin barra delante ej: contacto',
                      },
                      title: {
                        label: 'Título del enlace estático',
                        element: 'input',
                        type: 'text',
                        placeholder: 'ej: Contacto',
                      }
                    }
                  }
                }
              },
              openAI: {
                rows: {
                  row1: {
                    formElements: {
                      prompt: {
                        label: '¿Qué datos quieres ver?',
                        element: 'textarea'
                      }
                    }
                  }
                }
              }
            }
          }
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        apiResourceId: 7,
        adminPageId: 5,
        name: 'admin-form-component',
        endpoint: 'locale-seo-slugs',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        apiResourceId: 7,
        adminPageId: 5,
        name: 'admin-table-component',
        endpoint: 'locale-seo-slugs',
        structure: JSON.stringify(
          {
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
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admin_resources', null, {});
  }
};
