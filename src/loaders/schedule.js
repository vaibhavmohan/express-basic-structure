import findRemoveSync from "find-remove";
import { Logger } from "../utilities";
import { TempFileDir } from "../config";

class Schedule {
  static async init() {
    Schedule.deleteTempFiles();
  }

  /**
   * @description deletes old temporary files older than 10 hours every hour
   */
  static deleteTempFiles() {
    setInterval(() => {
      Logger.info('Deleting temporary files', { TempFileDir });

      const result = findRemoveSync(TempFileDir, { age: { seconds: 36000 }, files: '*.*', ignore: '.gitkeep' });

      Logger.info(`Deleted temporary files: ${Object.values(result).length}`);
    }, 3600000);
  }
}

module.exports = Schedule;
