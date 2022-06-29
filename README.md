# Magento 2 Hyva theme with Alpaca Next flavors
Have in mind it's just proof of concept and I'm not going to work on it anymore, but you can :)
## What is this repo all about?
During Reacticon V4 in late 2021, I've introduced concept of Alpaca Next, a Magento theme that makes some things very differently.

[You can watch a recording of my talk if you want to learn more about the initial idea](https://www.youtube.com/watch?v=5cSNr3LYgY4).

Unfortunately, I failed with execution of this idea, and now I'm leaving the Snowdog, and most likely I'm not going to have anything in common with Magento, but want to show you one more thing, a theme based on Hyva, but with some features from Alpaca Next.

## Reasoning
Hyva is clearly the best thing that happen to Magento 2 developers. Period.

But I'm not a Magento developer in understanding of the most people and companies, I don't give a damn about PHP, I don't write modules, I'm not a fan of XML layouts and probably few other things that might be considered as typical Magento development.

I like my big `node_modules`, I like my bundlers, I like my linters, I like when JS code is in JS files, I like when my tools are written in a language I understand. I know, in medieval times they would burn me alive 😂

In my opinion, Hyva is built for people that identify as Magento developers, and that's great, but it implies, that's not for me.

But of course, there is no point to deny that's Hyva is the future of Magento development (at least the classic one), so instead of listing what is wrong from my perspective, I've put some things that I consider as a better solution, but in the same time might not create a huge compatibility issues with the clean Hyva theme.

You need access to Hyva codebase to run this theme, [so please send some money to these guys](https://hyva.io/hyva-themes-license.html), they deserve it 💸

## What was changed or added?
### Vite and pnpm
Dependencies manager, build process and development tools, that makes working with JavaScript easier, especially if you are going to add any kind of dependencies on top of clean Hyva theme. It's also a great place to plug in any additional tools, like linters.

As a bonus, you get automatic page reload with every code change, including Tailwind compilation.

It won't affect negatively JS size in comparison to clean Hyva, but most likely will slightly optimize it, if you are using some additional libraries or reuse some own code between few views.

If Magento is set to `developer` mode it requires the Vite dev server to run, in production it reads output of `manifest.json` and injects build output respectively.

### JS outside templates
To be able to use Vite, the JS code needs to live outside the PHTML templates. As an example, I've moved Alipne.js initialization, you can found it in `src/scripts`.

Since Vite requires entry points for compilation, there is a `global.js` that will be injected to every page.

Optionally, you can create files with any layout handle to load stuff just when is needed, for example `cms_index_index.js` if you want something just on the home page.

### Components
For me, components needs to be reusable, contain markup, logic and styles, and be centralized, so you edit in one place, but it's updated everywhere.

That's why I've added a sample component to the `templates` directory and then imported it in `Magento_Theme/templates/html/header.phtml` (line 82).

Usage is not ideal, mostly due to lack of slot capabilities of Magento blocks and lack of partials like in Twig (via `include`), but I'd say it's better than nothing.

For sure, it can be wrapped in some abstraction to require less code and better performance (I believe that creating tons of blocks dynamically might not be ideal, but no one said that life of a person who is not in love with XML will be easy 😅)

I know I can use `getChildHtml` but it requires creating another block to set as a child, which is far from what slots should look like to be easy to use, so from my perspective it's easier to pass down already rendered HTML or just some text.

### Prettier and code formatting in general
Maintenance of codebase without tools enforcing given style of coding, or even handling it for the developers, especially in larger teams and between different companies, is definitely a challenge.

I wanted to apply automatic formatting for PHTML files, unfortunately [HTML parser](https://www.npmjs.com/package/angular-html-parser) that Prettier is using under the hood can't handle PHP parts, while [PHP parser](https://github.com/prettier/plugin-php) can't handle HTML parts. I've tried to write own parser on top of the two existing one, but I couldn't figure out how to do it without a serious amount of effort. Because of that, I've also failed with using [Tailwind plugin for Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

But Prettier works great for JavaScript and XML, so it's something.

For PHTML I've manually applied the same formatting as Prettier would apply, so you can inspire yourself.

Tip: For long lines with tons of Tailwind classes, turn on line wrapping in your editor.
