# CONTRIBUTING

Apigility and related modules (of which this is one) are open source and licensed
as [BSD-3-Clause](http://opensource.org/licenses/BSD-3-Clause). Contributions
are welcome in the form of issue reports and pull requests.


## Running Tests

First, please ensure you have [installed all requirements](README.md#requirements).

Once installed, you may run tests using:

Once dependencies are installed, you may run tests using:

```bash
$ grunt test
```

Alternately, fire up a terminal and run:

```bash
$ grunt watch
```

to run tests automatically as files are changed.

## Workflow

To develop the Admin UI (e.g., to add features or fix a bug), you will need to
run the server using the source, not distribution, files. This means using
`grunt serve` to develop.

All changes to the admin UI code should be made in the `src/` directory.

Once you are happy with the changes you have made, you will need to rebuild the
distribution files. Run the following from this directory:

```bash
$ grunt clean && grunt build
```

Test that everything is working against the distribution on completion.

## Adding JS/CSS Dependencies

If you need to add any new JS or CSS dependencies, please do so as follows:

- Edit the `bower.json` file and add the dependency.
- Execute `bower install`.
- Add the files to `src/index.html` in the appropriate section of the file.
- Commit your changes.

## Conduct

Please see our [CONDUCT.md](CONDUCT.md) to understand expected behavior when interacting with others in the project.
