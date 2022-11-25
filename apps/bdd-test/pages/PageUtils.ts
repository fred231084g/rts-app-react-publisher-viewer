import { ScenarioWorld } from '../support/ScenarioWorld';
import { capitalize } from '../utils/helper';

import { PublisherPreviewPage } from './PublisherPreviewPage';
import { PublisherStreamPage } from './PublisherStreamPage';
import { ViewerPage } from './ViewerPage';

export function getPageObject(scWorld: ScenarioWorld, pageName: string) {
  pageName = pageName.replace(' ', '');
  pageName = capitalize(pageName);
  switch (pageName) {
    case 'PublisherPreviewPage':
      if (scWorld.globalVariables[pageName] === undefined) {
        const previewPage = new PublisherPreviewPage(scWorld.publisherAppPage);
        scWorld.globalVariables[pageName] = previewPage;
        return previewPage;
      }
      return scWorld.globalVariables[pageName];
      break;
    case 'PublisherStreamPage':
      if (scWorld.globalVariables[pageName] === undefined) {
        const streamPage = new PublisherStreamPage(scWorld.publisherAppPage);
        scWorld.globalVariables[pageName] = streamPage;
        return streamPage;
      }
      return scWorld.globalVariables[pageName];
      break;
    case 'ViewerWaitingRoomPage':
      if (scWorld.globalVariables[pageName] === undefined) {
        const viewerPage = new ViewerPage(scWorld.viewerAppPage);
        scWorld.globalVariables[pageName] = viewerPage;
        return viewerPage;
      }
      return scWorld.globalVariables[pageName];
      break;
    default:
      throw Error(`Invalid Page Name: ${pageName}`);
  }
}
