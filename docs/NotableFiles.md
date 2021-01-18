# Notable Files & Directories
-----------------------------

An RDvue generated project adheres to the following folder structure. Our folder structure is geared towards keeping your code organized and maintainable.

```
├── public/
  ├── index.html
  
├── src/
  ├── components
  ├── config
  ├── layouts
  ├── main.ts
  ├── pages
  ├── services
  ├── store
  ├── theme
  
```

Public
------

Holds static files such as your index.html

Assets
------

Holds your static files such the images used throughout your application

Config
------

Holds the necessary configuration files for your application

####  env.dev.ts

Stores ENV variables used in development.

#### env.prod.ts

Stores ENV variables used in production environment.

#### env.ts

Stores general ENV variables used both in development and production. The env.ts also loads the appropriate environment variables depending on the application mode (development or production).

#### register-service-worker.ts

#### router.ts

Stores your application’s route definitions.

#### shims-tsx.d.ts

#### shims-vue.d.ts

Components
----------

Holds the folders for each component generated within your application

Entities
--------

This folder holds the definition of domain-specific _types & interfaces_ used across your project

Modules
-------

Pages
-----

Stores sub-folders containing the pages generated with your application.

Layouts
-------

Stores your layouts (e.g Nav Bar) which are in multiple places across your application. An RDvue generated app comes with a simple default layout (default.ts) file.

Theme
-----

Stores CSS/SCSS files for theming your application.

Services
--------

Stores application logic for API requests or fetching data.

Store
-----

Store sub-folder for the individual [Vuex](https://vuex.vuejs.org/) store modules generated within your application.

* * *