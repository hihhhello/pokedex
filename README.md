<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hihhhello/pokedex">
    <img src="client/src/assets/default-pokemon.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Favorite Pokemons</h3>

  <p align="center">
    Fullstack application for storing favoirte pokemons from <a href="http://pokeapi.co/">PokeAPI</a>
    <br />
    <a href="https://github.com/hihhhello/pokedex"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://hihhhello.club/pokedex/">View Demo</a>
    ·
    <a href="https://github.com/hihhhello/pokedex/issues">Report Bug</a>
    ·
    <a href="https://github.com/hihhhello/pokedex/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://user-images.githubusercontent.com/78423608/169836724-eafd8864-89b4-461e-ba11-a6832683182b.png)
![image](https://user-images.githubusercontent.com/78423608/169836774-752243f2-bfa4-4588-a413-374161f597e8.png)


This is a fullstack application for storing favorite pokemons from PokeAPI using your GitHub account.

The application is responsive friendly so don't worry about the view.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With
* TypeScript
* Axios
#### Frontend
* [React.js](https://reactjs.org/)
* [MUI](https://mui.com)
* Jest
* React Testing Library
* [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
* [Feature-Sliced Design](https://feature-sliced.design/)
#### Backend
* Express
* PostgreSQL (v10)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* npm - v8.3.1
* node - v16.3.1

### Installation

1. Setup your github application [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
2. Clone the repo
   ```sh
   git clone git@github.com:hihhhello/pokedex.git
   ```
3. Install NPM packages

   **General**
   ```sh
   npm install
   ```

   **Client**
   ```sh 
   cd client
   npm install
   ```

   **Server** (`cd` from root dir)
   ```sh
   cd server
   npm install
   ```
4. Setup `.env` variables:
   **Client**
   * Copy `.env.example`
   * Rename `.env.example` to `.env`
   * Use generated `Client ID` and `Authorization callback URL` from [Settings](https://github.com/settings/developers) to set `REACT_APP_CLIENT_ID` and `REACT_APP_REDIRECT_URI` respectively.
   * Set `REACT_APP_BASENAME` if you want to host your application on the subroute.

   **Server**
   * Copy `.env.example`
   * Rename `.env.example` to `.env.development` for `development` or to `.env.production` for `production`.
   * Use generated `Client ID` and one of the `Client secrets` from [Settings](https://github.com/settings/developers) to set `APP_CLIENT_ID` and `RAPP_CLIENT_SECRET` respectively.
   * Set `DB_*` values to connect database.
   * Set `PORT` on which run your sever.
   * Set `BASE_URL` to have pagination values such as `"next": <process.env.BASE_URL>/api/fav-pokemons/<USER_ID>?offset=25&limit=25`

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Anton Ratushniak - anton.hihhhelo@gmail.com

Project Link: [https://github.com/hihhhello/pokedex](https://github.com/hihhhello/pokedex)

<p align="right">(<a href="#top">back to top</a>)</p>
