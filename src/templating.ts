import { EnvType, load } from 'ts-dotenv';
import { default_css, envSchema } from "./models";
export type Env = EnvType<typeof envSchema>;

let path = require('path');
import * as fs from "fs";

export function createCustomTemplate(env: Env) {
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

function checkColorEnvs(file: string, env: Env) {     
    if (env.MAIN_COLOR && (env.MAIN_COLOR != default_css.main_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*MAIN_COLOR\s*\*\//g, `${env.MAIN_COLOR};`)
    }
    if (env.MAIN_BACKGROUND_COLOR && (env.MAIN_BACKGROUND_COLOR != default_css.main_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*MAIN_BACKGROUND_COLOR\s*\*\//g, `${env.MAIN_BACKGROUND_COLOR};`)
    }
    if (env.HEADER_BACKGROUND_COLOR && (env.HEADER_BACKGROUND_COLOR != default_css.header_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*HEADER_BACKGROUND_COLOR\s*\*\//g, `${env.HEADER_BACKGROUND_COLOR};`)
    }
    if (env.HEADER_COLOR && (env.HEADER_COLOR != default_css.header_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*HEADER_COLOR\s*\*\//g, `${env.HEADER_COLOR};`)
    }
    if (env.SIDEBAR_BACKGROUND_COLOR && (env.SIDEBAR_BACKGROUND_COLOR != default_css.sidebar_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_BACKGROUND_COLOR\s*\*\//g, `${env.SIDEBAR_BACKGROUND_COLOR};`)
    }
    if (env.SIDEBAR_COLOR && (env.SIDEBAR_COLOR != default_css.sidebar_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_COLOR\s*\*\//g, `${env.SIDEBAR_COLOR};`)
    }
    if (env.SIDEBAR_COLOR_HOVER && (env.SIDEBAR_COLOR_HOVER != default_css.sidebar_color_hover)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_COLOR_HOVER\s*\*\//g, `${env.SIDEBAR_COLOR_HOVER};`)
    }  
    if (env.HEADER_CUSTOM_FONT) {
        fs.copyFile(path.join(__dirname, "..", env.HEADER_CUSTOM_FONT), path.join(__dirname, "..", "public", env.HEADER_CUSTOM_FONT), (err) => {
            console.error(err);
        });
        file = file.replace(/REPLACE_FONT_PATH/g, `./${env.HEADER_CUSTOM_FONT}`)
    }
    if (env.HEADER_CUSTOM_FONT_SIZE) {        
        file = file.replace(/\d+px\s*\;\s*\/\*\s*HEADER_CUSTOM_FONT_SIZE\s*\*\//g, `${env.HEADER_CUSTOM_FONT_SIZE};`)
    }
    if (env.CODE_HIGHLIGHTING_COLOR) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*CODE_HIGHLIGHTING_COLOR\s*\*\//g, `${env.CODE_HIGHLIGHTING_COLOR};`)
    }    
    return file;
}