import { default_css } from "./models";

let path = require('path');
import * as fs from "fs";

export function createCustomTemplate(env) {
    const csspath = path.join(__dirname, "..", "templates", "style.css")
    const buffer = fs.readFileSync(csspath);
    let file = buffer.toString();

    if (env) {
        file = checkColorEnvs(file, env);
    }
    fs.writeFileSync(path.join(__dirname, "..", "public", "style.css"), file, 'utf8');
    fs.copyFile(path.join(__dirname, "..", "templates", "loader.js"), path.join(__dirname, "..", "public", "loader.js"), (err) => {
        console.error(err);
    });
    fs.copyFile(path.join(__dirname, "..", "templates", "customcode.js"), path.join(__dirname, "..", "public", "customcode.js"), (err) => {
        console.error(err);
    });
}

function checkColorEnvs(file: string, env) {     
    const MAIN_COLOR = env.MAIN_COLOR ?? process.env.MAIN_COLOR;
    const MAIN_BACKGROUND_COLOR = env.MAIN_BACKGROUND_COLOR ?? process.env.MAIN_BACKGROUND_COLOR;
    const HEADER_BACKGROUND_COLOR = env.MAIN_BACKGROUND_COLOR ?? process.env.HEADER_BACKGROUND_COLOR;
    const HEADER_COLOR = env.HEADER_COLOR ?? process.env.HEADER_COLOR;
    const SIDEBAR_BACKGROUND_COLOR = env.SIDEBAR_BACKGROUND_COLOR ?? process.env.SIDEBAR_BACKGROUND_COLOR;
    const SIDEBAR_COLOR = env.SIDEBAR_COLOR ?? process.env.SIDEBAR_COLOR;
    const SIDEBAR_COLOR_HOVER = env.SIDEBAR_COLOR_HOVER ?? process.env.SIDEBAR_COLOR_HOVER;
    const HEADER_CUSTOM_FONT = env.HEADER_CUSTOM_FONT ?? process.env.HEADER_CUSTOM_FONT;
    const HEADER_CUSTOM_FONT_SIZE = env.HEADER_CUSTOM_FONT_SIZE ?? process.env.HEADER_CUSTOM_FONT_SIZE;
    const CODE_HIGHLIGHTING_COLOR = env.SIDEBAR_COLOR_HOVER ?? process.env.CODE_HIGHLIGHTING_COLOR;

    if (MAIN_COLOR && (MAIN_COLOR != default_css.main_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*MAIN_COLOR\s*\*\//g, `${MAIN_COLOR};`)
    }
    if (MAIN_BACKGROUND_COLOR && (MAIN_BACKGROUND_COLOR != default_css.main_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*MAIN_BACKGROUND_COLOR\s*\*\//g, `${MAIN_BACKGROUND_COLOR};`)
    }
    if (HEADER_BACKGROUND_COLOR && (HEADER_BACKGROUND_COLOR != default_css.header_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*HEADER_BACKGROUND_COLOR\s*\*\//g, `${HEADER_BACKGROUND_COLOR};`)
    }
    if (HEADER_COLOR && (HEADER_COLOR != default_css.header_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*HEADER_COLOR\s*\*\//g, `${HEADER_COLOR};`)
    }
    if (SIDEBAR_BACKGROUND_COLOR && (SIDEBAR_BACKGROUND_COLOR != default_css.sidebar_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_BACKGROUND_COLOR\s*\*\//g, `${SIDEBAR_BACKGROUND_COLOR};`)
    }
    if (SIDEBAR_COLOR && (SIDEBAR_COLOR != default_css.sidebar_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_COLOR\s*\*\//g, `${SIDEBAR_COLOR};`)
    }
    if (SIDEBAR_COLOR_HOVER && (SIDEBAR_COLOR_HOVER != default_css.sidebar_color_hover)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_COLOR_HOVER\s*\*\//g, `${SIDEBAR_COLOR_HOVER};`)
    }  
    if (HEADER_CUSTOM_FONT) {
        fs.copyFile(path.join(__dirname, "..", HEADER_CUSTOM_FONT), path.join(__dirname, "..", "public",HEADER_CUSTOM_FONT), (err) => {
            console.error(err);
        });
        file = file.replace(/REPLACE_FONT_PATH/g, `./${HEADER_CUSTOM_FONT}`)
    }
    if (HEADER_CUSTOM_FONT_SIZE) {        
        file = file.replace(/\d+px\s*\;\s*\/\*\s*HEADER_CUSTOM_FONT_SIZE\s*\*\//g, `${HEADER_CUSTOM_FONT_SIZE};`)
    }
    if (CODE_HIGHLIGHTING_COLOR) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*CODE_HIGHLIGHTING_COLOR\s*\*\//g, `${CODE_HIGHLIGHTING_COLOR};`)
    }    
    return file;
}