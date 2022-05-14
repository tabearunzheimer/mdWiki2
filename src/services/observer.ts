import chokidar from "chokidar";
import { Path } from "typescript";
import { MdConverter } from "../converter";

export function startFileWatcher(targetFolder: Path, converter: MdConverter) {
    let watcher = chokidar.watch(targetFolder, { persistent: true });
    let initialized = false;
    watcher.on('all', function (path: Path) {
        if (!initialized) return;
        console.log('File', path, 'has been changed');
        converter.init();
    })
    watcher.on("ready", function (path) {
        console.log("Filewatcher is ready");
        initialized = true;
    })
}
