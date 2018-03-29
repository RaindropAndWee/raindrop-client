## Raindrop Client
### The Future In E-Commerce

  Raindrop is an E-commerce site that sells a variety of products. Users can
  browse a variety of products across a range of categories including: Electronics,
  Clothing, Entertainment and more!


## Web App URL

https://raindropandwee.github.io/raindrop-client/

## Raindrop API URL/Github Repo

- Github Repo: https://github.com/RaindropAndWee/raindrop-api
- API: https://raindrop-api.herokuapp.com/

## Development Process
The development process was quite challenging and we were very fortunate that our team was flexible and had great synergy. We kicked off with what we knew -- basic testing environments all in one view, CURL scripts, event handler files, etc.

The first major breakthrough was figuring out how we would parse data pulled in from the API and store data locally to be used with simple front-end functions. User data, product inventory info, and cart info would be stored in a local file early in the user journey. Or so we thought. We quickly realized that actions such as updating cart quantity and prices accurately would need more API calls more frequently so we went through several more major front-end logic changes early on.

Stripe was a major roadblock early in the process and many of the team's man hours were devoted to deciphering the documentation and figuring out how it would work with the GA template environment. It was during this phase that we all learned some valuable lessons in reading code, reading documentarion, and learning from previous developers' mistakes (via old issue threads on github).

As we neared MVP we began to start planning for our nice-to-haves - stuff we were really excited for. As we passed the harder stages of MVP requirements we began to discuss and plan for delegating work on new features, always just focusing on one or two at a time. This was a fun stage of the project where we got to stretch our creativity but it also resulted in some incredibly stressful moments when we would get stumped on some complicated problems.

All-in-all we were super lucky in many ways but also pushed ourselves and each other constantly and believe we've made something that a team of junior developers can be quite proud of.

Raindrop and Wee out.

## Wire Frames
![wireframe1](https://i.imgur.com/fWnevD0.jpg)


## User Stories
Below are some of the initial user stories we made during the planning stage:
  As a user, I should be able to:

- create an account
- login to my account
- change my password
- sign out of my account
- See all produts
- View my cart-items
- Add products to my cart
- Remove a product from my cart
- Purchase products from my cart
- View all of my past purchases

## Technologies Used
* JavaScript
* jQUERY
* AJAX
* HTML5
* SASS/CSS3
* Handlebars
* Bootstrap
* GIT/GITHUB
* Atom
* Webpack
* Stripe

## Future Iterations
- In-progress sort function. Impressive shit not well tested yet
- Shipping/address info for users and carts/orders
- Multiple images for products
- Product variations
- Product tags for categorization
