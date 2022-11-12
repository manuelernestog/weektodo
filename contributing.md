# Contributing to Weektodo

Thanks for checking out Weektodo! We'd love for you to contribute. Whether
you're a first-time open source contributor or an experienced developer, there
are ways you can help make Weektodo great!

## Contributing Code

One of the best ways is to grab a
[bug report](https://community.getWeektodo.com/c/bugs/10),
[sync issue](https://community.getWeektodo.com/c/sync/22),
or [feature suggestion](https://community.getWeektodo.com/c/features/12)
that has been marked `accepted` and dig in. You can especially look for issues
marked as `help-wanted` or `low-hanging-fruit`.

Please be wary of working on issues *not* marked as `accepted`. Just because
someone has created an issue doesn't mean we'll accept a pull request for it.
See [Where to Contribute](#where-to-contribute) below for more information.

You can also help implement *any* feature by creating a **plugin** for it!
If you need inspiration, you can dig through the list of
[feature suggestions](https://community.getWeektodo.com/c/features/12),
especially looking for anything marked `for-plugin`.

### Pull requests

The first time you submit a pull request, a bot will ask you to sign a
standard, bare-bones Contributor License Agreement. The CLA states that you
waive any patent or copyright claims you might have to the code you're
contributing. (For example, you can't submit a PR and then sue Weektodo
for using your code.)

## Filing Issues

If you have a bug to report or a feature to suggest, you may do so on our
[Discourse](https://community.getWeektodo.com/). Please carefully follow all
instructions in the template for the given type of issue you're reporting.

We also ask that you search for existing issues, *including closed ones!*
We're in the process of migrating. If someone has already reported a bug or
requested the feature you have in mind,  **vote for it** at the top.
Higher voted issues are more likely to be addressed.

For bugs, please verify that you're running the latest version of Weektodo.
If you file an issue without providing detail, we may close it without comment.

**Under no circumstances should you report an issue via GitHub. The GitHub
Issues feature is exclusively for Weektodo contributors to track tasks
which have been diagnosed, accepted, and scheduled on the roadmap.**

# Build and Run From Source

If you want to understand how Weektodo works or want to debug an issue,
you'll want to get the source, build it, and run it locally.

## Installing Prerequisites

You'll need git, a recent version of Node.JS (currently v16.X is recommended), Yarn and Electron.

```
git clone https://github.com/manuelernestog/weektodo
cd weektodo
yarn install
yarn run serve // to run web version
yarn run electron:serve // to run native version
```

## Development Workflow

# Where to Contribute

Check out our [Discourse](https://community.getWeektodo.com/) for all
potential areas for contributions. Note that just because a topic exists does
not mean we will accept a contribution to the core mail client for it. There
are several reasons we may not accepts a pull requests, like:

- **Maintainability** - We're _extremely_ wary of adding options and preferences
  for niche behaviors. Email is a wild west, and we can't afford to support
  every possible configuration. Our general rule is that the code complexity
  of adding a preference isn't worth it unless the user base is fairly evenly
  divided about the desired behavior.
  [We don't want to end up with this!](https://cloud.githubusercontent.com/assets/1037212/14989123/2a74e810-110b-11e6-8b5d-6f343bca712f.png)

- **User experience** - We want to deliver a lightweight and smooth mail
  client, so UX and performance matter a lot. If you'd like to change or
  extend the UI, consider doing it in a plugin or theme.

- **Architectural** - The team and/or feature owner needs to agree with any
  architectural impact a change may make. Things like new extension APIs must
  be discussed with and agreed upon by the feature owner. To improve the
  chances to get a pull request merged you should select an issue that is
  labelled with the help-wanted or bug labels.

In short, if the issue you want to work on is not labelled with `accepted`, you
can start a conversation on the Discourse topic about whether an external
contribution will be considered.

# Code of Conduct

In order to keep the conversation clear and transparent, please limit
discussion to English and keep things on topic with the issue. Be considerate
to others and try to be courteous and professional at all times.

Please note that this project is released with a Contributor Code of Conduct.
By participating in this project you agree to abide by its terms.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
