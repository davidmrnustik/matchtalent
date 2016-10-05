# Preparación del entorno local #

Necesitas node con npm. Si no las tienes, instalalo desde https://nodejs.org/en/.

​Si no tienes bower (https://bower.io/), instalalo asi:  
$ npm install -g bower  

**Sigue con los siguientes:**  
$ bower install  
$ npm install  
$ gulp *- hace build en /_dev a lanza servidor en localhost:3000*  
$ gulp build *- hace build en /_dev*  
$ surge _dev --domain matchtalent.surge.sh *- hace despliegue a matchtalent.surge.sh (preproducción), hay que instalar surge http://surge.sh/: "npm install --global surge" *

## Metodología ##
Estructura del proyecto sigue la metodología BEM:  
https://en.bem.info/methodology/quick-start/

Cada elemento (header, footer, button, ...) tiene sus recursos (js/scss) en su carpeta en /app/blocks/. El indice de las class en plantillas html puedes ver en /bem.txt.  

Por ejemplo esta class:  
"**our-features__icon_social-networks**", nombre de block es "**our-features**", su element es "**icon**" y modifier "**social-networks**".

## Estructura ##

/app *- ubicación de las páginas web*  
/app/base *- js y scss comunes*  
/app/blocks/ *- elementos con sus recursos js y scss*  
/app/components/ *- componentes gestionados por bower*  
/app/fonts *- fuentes*  
/app/img *- imagenes*  
/app/templates *- plantillas html*