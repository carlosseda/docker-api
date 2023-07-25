const OpenAI = require('./openai')

exports.camelCase = (name) => {

  name = name.toLowerCase()

  if(name.includes("_")) {

    const words = name.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const camelCaseName = capitalizedWords.join('');

    return camelCaseName

  }else {

    const camelCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    return camelCaseName
  }
}

exports.kebabCase = (name) => {

  if(name.includes("_")) {

    const words = name.split('_');
    const kebabCaseName = words.join('-');

    return kebabCaseName
  }

  if(name.includes(" ")) {

    const words = name.split(' ');
    const kebabCaseName = words.join('-');

    return kebabCaseName
  }

  return name
}
  

exports.singularize = async (name) => {
  
  const openAI = new OpenAI()
  const prompt = `Dame el singular en ingles de la palabra "${name}", si la palabra usa barra baja mantenla en el nombre:`
  openAI.setCompletion('singularize', prompt)

  let singular = await openAI.getAnswer()
  singular = singular.replace(/\s/g, '').replace(/[^a-zA-Z_]/g, '').toLowerCase()

  openAI.completion = null

  return singular;
}