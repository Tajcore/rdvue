import shell from 'shelljs';
import { Command, flags } from '@oclif/command';
import path from 'path';
import chalk from 'chalk';
import { checkProjectValidity, isJsonString } from '../../lib/utilities';
import { readFile } from '../../lib/files';
import { CLI_COMMANDS, CLI_STATE, TEMPLATE_REPO, TEMPLATE_ROOT, TEMPLATE_TAG, DOCUMENTATION_LINKS, } from '../../lib/constants';

const CUSTOM_ERROR_CODES = [
  'project-invalid',
];

export default class Upgrade extends Command {
  static description = 'Specify the rdvue template version for a project'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    { name: 'name', description: 'rdvue version' },
  ]

  // override Command class error handler
  catch(error: Error): Promise<any> {
    const errorMessage = error.message;
    const isValidJSON = isJsonString(errorMessage);
    const parsedError = isValidJSON ? JSON.parse(errorMessage) : {};
    const customErrorCode = parsedError.code;
    const customErrorMessage = parsedError.message;
    const hasCustomErrorCode = customErrorCode !== undefined;

    if (hasCustomErrorCode === false) {
      // throw cli errors to be handled globally
      throw errorMessage;
    }

    // handle errors thrown with known error codes
    if (CUSTOM_ERROR_CODES.includes(customErrorCode)) {
      this.log(`${CLI_STATE.Error} ${customErrorMessage}`);
    } else {
      throw new Error(customErrorMessage);
    }

    return Promise.resolve();
  }

  async run(): Promise<void> {
    const { isValid: isValidProject, projectRoot } = checkProjectValidity();
    // block command unless being run within an rdvue project
    if (isValidProject === false) {
      throw new Error(
        JSON.stringify({
          code: 'project-invalid',
          message: `${CLI_COMMANDS.Upgrade} command must be run in an existing ${chalk.yellow('rdvue')} project`,
        }),
      );
    }

    const { args } = this.parse(Upgrade);
    const template: string = TEMPLATE_REPO;
    const versionName = args.name ?? TEMPLATE_TAG;
    const temporaryProjectFolder = path.join(projectRoot, 'node_modules', '_temp');
    const templateSourcePath = path.join(temporaryProjectFolder, TEMPLATE_ROOT);
    const templateDestinationPath = path.join(projectRoot, '.rdvue');

    // // retrieve project files from template source
    // await shell.exec(`git clone ${template} --depth 1 --branch ${versionName} ${temporaryProjectFolder}`, { silent: true });
    // // copy template files to project local template storage
    // await shell.exec(`cp -R ${templateSourcePath} ${templateDestinationPath}`);

    // Steps
    // 1. read package.json file form project root
    // const rawPackageConfig = await readFile(path.join(projectRoot, 'package.json'));
    // const packageConfig = JSON.parse(rawPackageConfig);
    // console.log(packageConfig);
    // 2. compare packages in existing package.json with the updated package.json cloned in above
    // 3. remove unused project dependencies and devDependencies
    // 4. add missing packages to project dependencies and devDependencies
    // 5. update existing packages to appropriate versions
    // 6. write package.json file back to project root
    // 7. remove unused files ( vue.config.js, .env, .env.example, .package-lock.json )
    // 8. include new project folders and files ( scripts/config, config/.env, config/.env.example, webpack.config.js )
    // 9. update existing project files ( main.ts, tsconfig.json, tailwind.config.js, src/pages/hello-world, readme )
    // 10. create a module within this command that can carry out the above actions for a specified version

    // // remove temp folder from project
    // await shell.exec(`rm -rf ${temporaryProjectFolder}`);

    this.log(`${CLI_STATE.Success} rdvue updated to version: ${chalk.green(versionName)}`);


    this.log(`\n  ${chalk.yellow('rdvue')} has been updated to use the esbuild bundler!\n  Learn more here: ${chalk.yellow(DOCUMENTATION_LINKS.EsBuild)}\n`);
  }
}
