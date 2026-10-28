import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,pathname==='/'?'index.html':'.'+pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}let data;try{data=await readFile(file)}catch{data=await readFile(path.join(root,'public',pathname))}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404).end('Not found')}}).listen(3000,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:3000'));
