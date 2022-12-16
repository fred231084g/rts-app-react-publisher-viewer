/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { expect } from '@playwright/test';
import { BrowserContext } from 'playwright';
import { ScenarioWorld } from '../../hooks/ScenarioWorld';
import { logger } from '../../logger';
import { BrowserManager } from '../utils/BrowserManager';

export async function openPages(
  scenarioWorld: ScenarioWorld,
  browserMgr: BrowserManager,
  apps: string[]
): Promise<void> {
  logger.trace('Create context and page');
  const context = await browserMgr.newContext(scenarioWorld);
  scenarioWorld.globalVariables.context = context;

  for (const app of apps) {
    const appPage = await browserMgr.newPage(context);
    scenarioWorld.globalVariables[app] = appPage;
    scenarioWorld.globalVariables[`${app}ConsoleLogs`] = BrowserManager.monitorConsoleLogs(appPage);
    const videoFile = (await appPage.video()?.path()) as string;
    if (videoFile.trim() !== '') scenarioWorld.globalVariables[`${app}VideoFile`] = videoFile;
  }
}

export async function closePages(
  scenarioWorld: ScenarioWorld,
  browserMgr: BrowserManager,
  apps: string[]
): Promise<void> {
  logger.trace('Close context and page');
  const context = scenarioWorld.globalVariables.context as BrowserContext;

  // Close Pages and Context
  await browserMgr.closePages(context);
  await BrowserManager.closeContext(context);

  // Verify Console logs for the opened pages/tabs
  for (const app of apps) {
    const consoleLogs = scenarioWorld.globalVariables[`${app}ConsoleLogs`] as string[];
    const errorLogs = BrowserManager.filterErrorLogs(consoleLogs);
    logger.trace(`${app} Console Logs: ${consoleLogs}`);
    if (errorLogs.length > 0) logger.error(`${app} Error Console Logs: ${errorLogs}`);
    expect(errorLogs).toHaveLength(0);
  }
}