
# Welcome to SinonimosAPI 
<a align="center" href="#" target="_blank">
 <p>
  <img src="https://i.imgur.com/K3wvK7Z.png" width="350">
 </p>
</a>

#### Opa, meu bom, tudo em cima?
Have you, fellow Brazilian, ever wondered where to find some of those good synonyms in form of an API to help you finish your paper? ~~No? Me neither.~~ I'm sure you did, just like me.
So guess what, you just found it. There's no need to keep looking for one. *(only if you want a faster one)*

This is an API based on the great student savior's website, [Sinonimos](https://www.sinonimos.com.br/). A wonderful place where you find a way to not repeat the same word over and over again, and still manage to do it with style.



## Usage
This is a pretty simple API, just choose your word, replace the last tag on the link below with it and the API will return a JSON containing a set of synonyms grouped by similar meanings.

Method | Endpoint           | Description
-------|--------------------|-------------
GET    | /.netlify/functions/api/?q=**word** | Returns a set of synonyms grouped by similar meanings.

### Exemple

Method | Endpoint           | Description
-------|--------------------|-------------
GET    | [/.netlify/functions/api/?q=**pensar**](https://sinonimosapi.netlify.com/.netlify/functions/api/?q=pensar)           | Returns a set of *pensar* synonyms grouped by similar meanings.

## Advice 

![](https://en.meming.world/images/en/thumb/b/be/But_It%27s_Honest_Work.jpg/300px-But_It%27s_Honest_Work.jpg)
