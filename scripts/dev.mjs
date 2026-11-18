import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from 'next/dist/server/lib/start-server.js';

const args = process.argv.slice(2);
const portFlagIndex = args.findIndex((arg) => arg === '-p' || arg === '--port');
const requestedPort = portFlagIndex >= 0 ? Number(args[portFlagIndex + 1]) : 3004;

if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    console.error('Ange en giltig port med -p eller --port.');
    process.exit(1);
}

delete process.env.TURBOPACK;
process.env.NEXT_DIST_DIR ??= `.next-dev-${process.pid}`;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

startServer({
    dir: path.resolve(scriptDirectory, '..'),
    port: requestedPort,
    isDev: true,
    hostname: 'localhost',
    allowRetry: false,
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
