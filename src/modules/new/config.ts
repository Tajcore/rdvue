import chalk from 'chalk';
import {
  DEFAULT_PROJECT_NAME,
  OPTIONS_ALL,
  REGEX_PROJECT_NAME,
  TEMPLATE_PROJECT_URL
} from '../../constants/constants';
import * as files from '../../lib/files';
import { Arguments, Config } from '../../types/cli';

async function validate(this: any, value: string): Promise<any> {
  const done = this.async();
  if (value.length === 0 || value.match(REGEX_PROJECT_NAME) !== null) {
    done(chalk.red(`You need to enter a valid project name`));
  } //  Directory with specified name already exists
  else if (files.directoryExists(value)) {
    done(chalk.red(`Project with the name ${value} already exists`));
  } else {
    done(null, true);
  }
}

function parsePrompts(config: Config): any[] {
  return config.arguments !== undefined ? config.arguments
    .filter((q: Arguments) => {
      return q.isPrivate === undefined;
    })
    .map((p: any) => {
      return {
        type: 'input',
        name: p.name,
        message: `Please enter ${p.description}`,
        default: null,
        validate,
      };
    }) : [];
}

const QUESTIONS: any[] = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter a name for the project:',
    default: DEFAULT_PROJECT_NAME,
    validate,
  },
  {
    type: 'input',
    name: 'description',
    default: null,
    message: 'Enter a description of the project (optional):'
  }
];

export {
  TEMPLATE_PROJECT_URL,
  OPTIONS_ALL,
  QUESTIONS,
  parsePrompts,
};
