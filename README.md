Demo de la página: http://demo.matchtalent.com.es  
Production: http://matchtalent.com.es

# Preparación del entorno local #

Necesitas node con npm. Si no las tienes, instalalo desde https://nodejs.org/en/.

​Si no tienes bower (https://bower.io/), instalalo asi:  
$ npm install -g bower  

**Sigue con los siguientes:**  
$ bower install  
$ npm install  
$ gulp *- hace build en /_dev a lanza servidor en localhost:3000*  
$ gulp build *- hace build en /_build*  

# Metodología #
Estructura del proyecto sigue la metodología BEM:  
https://en.bem.info/methodology/quick-start/

Cada elemento (header, footer, button, ...) tiene sus recursos (js/scss) en su carpeta en /app/blocks/. El indice de las class en plantillas pug puedes ver en /bem.txt.  

Por ejemplo esta class:  
"**our-features__icon_social-networks**", nombre de block es "**our-features**", su element es "**icon**" y modifier "**social-networks**".

# Estructura #

/app *- ubicación de las páginas web*  
/app/base *- js y scss comunes*  
/app/blocks/ *- elementos con sus recursos js y scss*  
/app/components/ *- componentes gestionados por bower*  
/app/fonts *- fuentes*  
/app/img *- imagenes*  
/app/templates *- plantillas pug*  
/app/translations *- traducciones en JSON*

# Plantilas #

Plantillas están ubicadas en /app/templates/ y están hechas con el sistema de render de plantillas **pug** (https://pugjs.org/api/getting-started.html). Tienen extensión *.pug y siguen syntax de pug (https://pugjs.org/language/attributes.html).  

Los mixins (predeterminados trozos de código) están definidos en /app/template/inc/mixin.pug. Cabecera y pie están en /app/template/inc/head.pug resp. /app/template/inc/footer.pug.

# Contenido #

El contenido de las páginas está ubicado en /app/translations/es.json.

# Despliegue #

$ ruby deploy/deploy.rb demo *- despliegue a demo*  
$ ruby deploy/deploy.rb production *- despliegue a producción*  
El proceso hace gulp build y sube la aplicación al entorno elegido por FTP de código Ruby.