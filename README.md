# AxelSpace Technical Challenge - Matt Brooks

## Install
- Mapbox requires an API token, so you must make a file at ./.mapbox-code, and paste the token in as the first line of the file
    - adding .mapbox-code to .git/info/exclude is a good idea, to prevent accidentally adding it to the git history
- NodeJs
    - there is a .nvmrc file, so if you use [node version manager](https://github.com/nvm-sh/nvm) you can get the correct node version by issuing `$:nvm use` at the command line
    - if you have the [Nix package manager](https://github.com/NixOS/nix)  installed, default.nix and shell.nix allow you to use Nix to manage the nodeJS version
        - if you add a .envrc file with the contents "use_nix", [direnv](https://direnv.net/) can be used to automatically activate the development environment when you cd into this directory
    - if you want to do a manual global install of NodeJs, we are using v18

## Unit Tests
- in the axelspace project directory, you can run the tests with "$npm run test"
    - I learned how to use [Vitest](https://vitest.dev/)

### References
- using mapbox: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
- Vitest setup: https://vitest.dev/guide/
    - basic test config: https://github.com/vitest-dev/vitest/tree/main/examples/basic
