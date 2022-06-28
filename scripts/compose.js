const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')
const titleCase = require('../lib/utils/titleCase')

const root = process.cwd()

const getAuthors = () => {
  const authorPath = path.join(root, 'data', 'authors')
  const authorList = fs.readdirSync(authorPath).map((filename) => path.parse(filename).name)
  return authorList
}

const getLayouts = () => {
  const layoutPath = path.join(root, 'layouts')
  const layoutList = fs
    .readdirSync(layoutPath)
    .map((filename) => path.parse(filename).name)
    .filter((file) => file.toLowerCase().includes('post'))
  return layoutList
}

const genFrontMatter = (answers) => {
  const t = titleCase(answers.title ? answers.title : 'Untitled')
  let d = new Date()
  const date = d.toISOString()
  const tagArray = answers.tags.split(',')
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()))
  const tags = "'" + tagArray.join("','") + "'"
  const authorArray = answers.authors.length > 0 ? "'" + answers.authors.join("','") + "'" : ''

  let frontMatter = dedent`---
  title: '${t}'
  date: '${date}'
  tags: [${answers.tags ? tags : ''}]
  draft: ${answers.draft === 'yes' ? true : false}
  summary: '${answers.summary ? answers.summary : ' '}'
  thumbnail: ${answers.thumbnail === 'yes' ? true : false}
  layout: ${answers.layout}
  `

  if (answers.authors.length > 0) {
    frontMatter = frontMatter + '\n' + `authors: [${authorArray}]`
  }

  frontMatter = frontMatter + '\n---'

  return frontMatter
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },

    {
      name: 'authors',
      message: 'Choose authors:',
      type: 'checkbox',
      choices: getAuthors,
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['yes', 'no'],
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'thumbnail',
      message: 'thumbnail true or false?',
      type: 'list',
      choices: ['yes', 'no'],
    },
    {
      name: 'layout',
      message: 'Select layout',
      type: 'list',
      choices: getLayouts,
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = genFrontMatter(answers)
    const filePath = `data/blog/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
    const idFilePath = `data/blog/${fileName ? fileName : 'untitled'}.${
      answers.extension ? `id.${answers.extension}` : 'id.md'
    }`
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${filePath}`)
      }
    })
    fs.writeFile(idFilePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${idFilePath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!', error)
    }
  })