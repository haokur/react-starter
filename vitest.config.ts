import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(configEnv =>
    mergeConfig(
        viteConfig(configEnv),
        defineConfig({
            test: {
                environment: "happy-dom", // 没有此项,可能报错ReferenceError: document is not defined
                // benchmark: {},
                sequence: {
                    concurrent: true,
                },
                exclude: [
                    'packages/template/*',
                    "node_modules/*"
                ],
                include: [
                    "__test__/*"
                ]
            },
        })
    )
)