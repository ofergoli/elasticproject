# elasticproject

Elasticsearch API

http://localhost:3000/Function/Repo

Function - addAd/ deleteAdById/ updateAd/ searchAd/findAllAd
Repo - adrepo
________________________________________
addAd - POST
Content-Type : application/json
data : valid json
________________________________________

deleteAdById - POST
params - id: elasticsearch_unique_id
________________________________________
updateAd - POST
Content-Type : application/json
data : valid json 
for example:
post to :
http://localhost:3000/updateAd/adrepo
{
"name": "data"
}
will update field name to data , if you add additional field it will be added to the item json
________________________________________
search - Get
Search parameters :
query : q
number of results : n  (default 10)
example :
 http://localhost:3000/updateAd/adrepo?q=binary options&n=10
________________________________________

findAll - Get
Search parameters :
example : http://localhost:3000/findAll/adrepo
________________________________________
