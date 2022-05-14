import { EnvType, load } from 'ts-dotenv';
import { default_css, envSchema } from "./models";
export type Env = EnvType<typeof envSchema>;

let path = require('path');
import * as fs from "fs";

export function createCustomTemplate(env: Env) {
    const csspath = path.join(__dirname, "..", "templates", "style.css")
    const buffer = fs.readFileSync(csspath);
    const file = buffer.toString();

    if (env) {
        checkColorEnvs(file, env);
    }
    fs.writeFileSync(path.join(__dirname, "..", "public", "style.css"), file, 'utf8');

}

function checkColorEnvs(file: string, env: Env) {
    if (env.MAIN_COLOR && (env.MAIN_COLOR != default_css.main_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*MAIN_COLOR\s*\*\//g, `${env.MAIN_COLOR}`)
    }
    if (env.MAIN_BACKGROUND_COLOR && (env.MAIN_BACKGROUND_COLOR != default_css.main_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*MAIN_BACKGROUND_COLOR\s*\*\//g, `${env.MAIN_BACKGROUND_COLOR}`)
    }
    if (env.HEADER_BACKGROUND_COLOR && (env.HEADER_BACKGROUND_COLOR != default_css.header_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*HEADER_BACKGROUND_COLOR\s*\*\//g, `${env.HEADER_BACKGROUND_COLOR}`)
    }
    if (env.HEADER_COLOR && (env.HEADER_COLOR != default_css.header_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*HEADER_COLOR\s*\*\//g, `${env.HEADER_COLOR}`)
    }
    if (env.SIDEBAR_BACKGROUND_COLOR && (env.SIDEBAR_BACKGROUND_COLOR != default_css.sidebar_background_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_BACKGROUND_COLOR\s*\*\//g, `${env.SIDEBAR_BACKGROUND_COLOR}`)
    }
    if (env.SIDEBAR_COLOR && (env.SIDEBAR_COLOR != default_css.sidebar_color)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_COLOR\s*\*\//g, `${env.SIDEBAR_COLOR}`)
    }
    if (env.SIDEBAR_COLOR_HOVER && (env.SIDEBAR_COLOR_HOVER != default_css.sidebar_color_hover)) {
        file = file.replace(/\#[a-fA-F0-9]{6}\s*\;\s*\/\*\s*SIDEBAR_COLOR_HOVER\s*\*\//g, `${env.SIDEBAR_COLOR_HOVER}`)
    }
    return file;
}