import wiki from "wikipedia";
import input from 'input'
import inquirer from 'inquirer'
import prompts from 'prompts'

const name = await prompts(
    {
        type: 'text',
        name: 'page',
        message: 'What page shloud we search today'
    }
);
let search = await wiki.search(name.page)
let choices = []
search.results.forEach((el) => {
    choices.push(el.title)
})
try {
    let answer = await prompts([
        {
            type: "select",
            name: "page",
            message: "What page would you to use?",
            choices: choices
        }
    ])
    const opts = await prompts([
        {
            type: 'select',
            name: 'open',
            message: 'Open The Page in a Browser?',
            initial: false,
            choices: [
                {
                    title: 'Yes, Open in a broser',
                    value: 'brow'
                },
                {
                    title: 'No, print out in terminal',
                    value: 'term'
                },
            ]
        },
    ]);
    if (opts.open == "term"){
        let page = await wiki.page(choices[answer.page])
        console.log()
    }
} catch (err){
    throw err;
}