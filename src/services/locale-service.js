const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')
const db = require('../models')
const Locale = db.Locale

module.exports = class LocaleServiceService {
 
  create = async (entity, entityId, locale) => {

    for (const language in locale) {

      for (const key in locale[language]) {
        try {
          await Locale.create({
            languageAlias: language,
            entity: entity,
            entityId: entityId,
            key: key,
            value: locale[language][key]
          })
        } catch (error) {
          console.log(error)
        }
      } 
    }
  }

  update = async (entity, entityId, locale) => {
    for (const language in locale) {          
      for (const key in locale[language]) {
        try {
          await Locale.update({
            value: locale[language][key]
          }, {
            where: {
              languageAlias: language,
              entity: entity,
              entityId: entityId,
              key: key
            }
          })
        } catch (error) {
          console.log(error)
        }
      } 
    }
  }

  delete = async (entity, entityId) => {  
    await Locale.destroy({
      where: {
        entity: entity,
        entityId: entityId
      }
    })
  }

  parseColletionWithLocales = async (collection) => {

    const parseData = {
      ['locales']: [] 
    };

    for (const locale of collection) {

      const languageAlias = locale.dataValues.languageAlias;
      delete locale.dataValues.languageAlias
      
      for (const key of Object.keys(locale.dataValues)) {
        parseData['locales'].push({ 
          languageAlias: languageAlias, 
          key: key,
          value: locale.dataValues[key]
        }); 
      }
    }

    return parseData;
  }
}
