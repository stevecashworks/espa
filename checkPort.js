import net from 'net';
export const checkPort=(port)=>{

    
 // Replace with the port number you want to check
    
    const server = net.createServer();
    
    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use`);
  } else {
    console.log(`Error occurred while checking port ${port}: ${err.message}`);
  }
  server.close();
});

server.once('listening', () => {
  console.log(`Port ${port} is available`);
  server.close();
});

server.listen(port, 'localhost');

}