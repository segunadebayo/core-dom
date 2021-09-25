import nodePlop, { ActionType } from "node-plop"
import shell from "shelljs"

const plop = nodePlop("plop-templates/plopfile.hbs")

interface Answers {
  name: string
  description: string
}

async function createPackage() {
  plop.setGenerator("package", {
    description: "Generates a component package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter component package name:",
      },
      {
        type: "input",
        name: "description",
        message: "The description of this component:",
      },
    ],
    actions(answers) {
      const actions: ActionType[] = []

      if (!answers) return actions

      const { name, description } = answers as Answers

      actions.push({
        type: "addMany",
        templateFiles: "package/**",
        destination: `../packages/{{dashCase name}}`,
        base: "package/",
        data: { description, packageName: name },
        abortOnFail: true,
      })

      return actions
    },
  })

  const { runPrompts, runActions } = plop.getGenerator("package")

  const answers = await runPrompts()
  await runActions(answers)
}

async function main() {
  await createPackage()
  shell.exec("yarn")
}

main()
