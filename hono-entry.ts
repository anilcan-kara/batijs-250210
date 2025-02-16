import { authjsHandler, authjsSessionMiddleware } from "./server/authjs-handler";

import { createTodoHandler } from "./server/create-todo-handler";
import { vikeHandler } from "./server/vike-handler";
import { Hono } from "hono";
import { createHandler, createMiddleware } from "@universal-middleware/hono";

// // @bun

// /*! MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
// import zlib from "node:zlib";

// // fyi, Byte streams aren't really implemented anywhere yet
// // It only exist as a issue: https://github.com/WICG/compression/issues/31

// const make = (ctx, handle) =>
//   Object.assign(ctx, {
//     writable: new WritableStream({
//       write: (chunk) => handle.write(chunk),
//       close: () => handle.end(),
//     }),
//     readable: new ReadableStream({
//       type: "bytes",
//       start(ctrl) {
//         handle.on("data", (chunk) => ctrl.enqueue(chunk));
//         handle.once("end", () => ctrl.close());
//       },
//     }),
//   });

// globalThis.CompressionStream ??= class CompressionStream {
//   constructor(format) {
//     make(
//       this,
//       format === "deflate" ? zlib.createDeflate() : format === "gzip" ? zlib.createGzip() : zlib.createDeflateRaw(),
//     );
//   }
// };

// globalThis.DecompressionStream ??= class DecompressionStream {
//   constructor(format) {
//     make(
//       this,
//       format === "deflate" ? zlib.createInflate() : format === "gzip" ? zlib.createGunzip() : zlib.createInflateRaw(),
//     );
//   }
// };

const app = new Hono();

app.use(createMiddleware(authjsSessionMiddleware)());

/**
 * Auth.js route
 * @link {@see https://authjs.dev/getting-started/installation}
 **/
app.use("/api/auth/**", createHandler(authjsHandler)());

app.post("/api/todo/create", createHandler(createTodoHandler)());

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
