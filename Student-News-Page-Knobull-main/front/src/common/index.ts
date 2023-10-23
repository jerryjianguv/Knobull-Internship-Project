import { getLocalMenu, saveLocalMenu } from '../utils'
import { getMenu } from '@/api'
import routes from '@/router/routes'
import { MenuResponse } from '@/types'
let currentJob: Promise<MenuResponse> | null
export function getMenus() {
  if (currentJob) {
    return currentJob
  }
  const job: Promise<MenuResponse> = new Promise(reslove => {
    reslove(routes)
    /* let localMenu = getLocalMenu();
    if (localMenu) {
      return reslove(localMenu);
    }
    getMenu()
      .then((result) => {
        saveLocalMenu(result);
        reslove(result);
      })
      .catch((err) => {
        reslove([]);
      }); */
  })
  currentJob = job
  job.finally(() => {
    currentJob = null
  })
  return job
}
