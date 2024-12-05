/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/config/env.js';

/** @type {import("next").NextConfig} */
const config = {};

// image domaine from github
config.images = {
  domains: ['avatars.githubusercontent.com'],
};

export default config;
