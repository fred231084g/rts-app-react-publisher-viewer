import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';

import { Screen, GlobalVariables, PlaywrightOptions } from '../utils/type';

export class ScenarioWorld extends World {
  screen!: Screen;

  browser!: Browser;

  context!: BrowserContext;

  publisherAppPage!: Page;

  viewerAppPage!: Page;

  options!: PlaywrightOptions;

  featureName!: string;

  scenarioName!: string;

  featureNameFormated!: string;

  scenarioNameFormated!: string;

  startTime!: Date;

  debug?: boolean = false;

  publisherConsoleLogs: string[] = [];

  publisherConsoleErrorLogs: string[] = [];

  viewerConsoleLogs: string[] = [];

  viewerConsoleErrorLogs: string[] = [];

  globalVariables: GlobalVariables = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(ScenarioWorld);
