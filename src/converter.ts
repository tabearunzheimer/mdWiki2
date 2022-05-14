let showdown = require('showdown');
import * as fs from "fs";
import { Path } from "typescript";
import { WS } from "./services/websocket";
let path = require('path');

export class MdConverter {

    private converter;
    private target: string;
    private source: string;
    public index: {[key:number]: any};
    private navbar: string;
    private ws: WS;
    private custom_title;

    constructor(source: string, targetPath: string, io: WS, custom_title: string) {
        this.converter = new showdown.Converter();
        this.source = source.replace(/\\/g, "/").replace(/^\.\//, ""); //if './' in path remove
        this.target = targetPath.replace(/\\/g, "/").replace(/^\.\//, ""); //if './' in path remove
        this.index = {};
        this.navbar = "";
        this.ws = io;
        this.custom_title = custom_title;
        this.target = path.join(__dirname, "..", this.target)
        const exists = this.checkFolder(this.target);
        if (exists) this.readFolder(this.source);
        this.createNavBar();
        
    }

    init(){
        this.navbar = "";
        this.index = {};
        this.readFolder(this.source);
        this.createNavBar();
        this.ws.sendUpdateRequest();
    }

    checkFolder(path: string) {
        if (!fs.existsSync(path)) {
            console.error(`Directory ${path} not found`);
            return false;
        }
        return true;
    }

    createNavBar(){
        const htmlpath = path.join(__dirname, "..", "templates", "index.html")
        const buffer = fs.readFileSync(htmlpath);
        const file = buffer.toString();
        let result = file.replace("<!--SIDENAV_REPLACE-->", this.navbar);
        if (this.custom_title != "mdWiki") {
            result = result.replace(/mdWiki/g, this.custom_title);
        }       
        fs.writeFileSync(path.join(__dirname, "..", "public", "index.html"), result, 'utf8');
    }

    readFolder(sourcePath: string) {
        const filter = ".md"
        if (!this.checkFolder(sourcePath)) return;

        let files = fs.readdirSync(sourcePath);
        for (let i = 0; i < files.length; i++) {
            let filename = path.join(sourcePath, files[i]);
            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                let dir = filename.replace(this.source, "");
                dir = path.join(this.target, dir);
                this.createFolder(dir);
                this.createFrontendFolder(filename)
                this.readFolder(filename); //recurse
                this.navbar += ` </div>`;
            } else if (filename.endsWith(filter)) {
                console.log('-- md found: ', filename);
                const indize = this.convertFile(filename);
                this.createFrontendDocEntry(filename, indize);

            };
        }
    }

    convertFile(file: Path) {
        const content = this.readFile(file);
        const html = this.converter.makeHtml(content);
        return this.writeHTMLFile(file, html);
    }

    readFile(file: Path) {
        const buffer = fs.readFileSync(file);
        return buffer.toString();
    }

    createFolder(filename: Path) {
        if (!fs.existsSync(filename)) {
            fs.mkdirSync(filename, { recursive: true });
        }
    }

    writeHTMLFile(name: string, html: string) {
        name = name.replace(/\\/g, "/");

        name = name.replace(this.source, "") //replace sourcefolder string

        name = name.replace(/.md/, ".html") //change name to md
        const targetPath = path.join(this.target, name);
        fs.writeFileSync(targetPath, html);
        console.log("FILE WRITTEN", targetPath);
        return this.createIndexEntry(targetPath);
    }

    createIndexEntry(fullpath: string){
        const i = Object.keys(this.index).length;
        this.index[i] = fullpath;
        return i;
    }

    createFrontendFolder(path: string){        
        const folder = path.replace(/^(?:\\|\/)?(?:\w+(?:\\|\/))+/g, "") 

        this.navbar += `<button class="subfolder">${folder}
        <i class="fa fa-caret-left"></i>
        <i class="fa fa-caret-down hide"></i></button>
        <div class="dropdown-container">`;        
    }

    createFrontendDocEntry(path: string, indize: number) {
        const name = path.match(/[\w()\[\]]+\.md$/);
        this.navbar += `<div id="nav-doc-${indize}" class="docEntry" onclick=loadContent(this) value='${indize}'>${name}</div>\n`
    }

}
