import { EnvSchema } from "ts-dotenv"

export const envSchema: EnvSchema = {
    HEADER_BACKGROUND_COLOR: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    HEADER_COLOR: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    SIDEBAR_BACKGROUND_COLOR: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    SIDEBAR_COLOR: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    SIDEBAR_COLOR_HOVER: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    MAIN_BACKGROUND_COLOR: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    MAIN_COLOR: {
        type: /^#[0-9A-Fa-f]{6}$/,
        optional: true,
    },
    DATA_PATH: {
        type: String,
        default: "/testmd",
    },
    PORT: {
        type: Number,
        default: 3000,
    },
    TITLE: {
        type: String,
        default: "mdWiki"
    },
    RENDER_PATH: {
        type: String,
        default: "/rendered",
    }
}
export const default_css = {
    header_background_color: "#1B1A59",
    header_color: "#ffffff",
    sidebar_background_color: "#111111",
    sidebar_color: "#818181",
    sidebar_color_hover: "#f1f1f1",
    main_background_color: "#ffffff",
    main_color: "#000000"
}